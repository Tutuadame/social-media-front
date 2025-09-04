#!/bin/bash

# Configuration
KAFKA_VERSION="2.13-4.0.0"  # Scala version - Kafka version
KAFKA_URL="https://downloads.apache.org/kafka/4.0.0/kafka_${KAFKA_VERSION}.tgz"
DOWNLOAD_DIR="$HOME/Documents"
KAFKA_DIR="$DOWNLOAD_DIR/kafka"
KAFKA_ARCHIVE="kafka_${KAFKA_VERSION}.tgz"

echo "=== Kafka Download and Setup Script ==="

# Create download directory if it doesn't exist
mkdir -p "$DOWNLOAD_DIR"
cd "$DOWNLOAD_DIR"

# Check if Kafka is already installed
if [[ -d "$KAFKA_DIR" ]]; then
    echo "Kafka directory already exists: $KAFKA_DIR"
    read -p "Do you want to re-download and overwrite? (y/N): " overwrite
    if [[ ! "$overwrite" =~ ^[Yy]$ ]]; then
        echo "Using existing Kafka installation..."
    else
        echo "Removing existing Kafka directory..."
        rm -rf "$KAFKA_DIR"
    fi
fi

# Download Kafka if not exists or overwrite selected
if [[ ! -d "$KAFKA_DIR" ]]; then
    echo "Downloading Kafka ${KAFKA_VERSION}..."
    
    # Download with progress bar
    if command -v wget >/dev/null; then
        wget --progress=bar:force:noscroll "$KAFKA_URL" -O "$KAFKA_ARCHIVE"
    elif command -v curl >/dev/null; then
        curl -L --progress-bar "$KAFKA_URL" -o "$KAFKA_ARCHIVE"
    else
        echo "Error: Neither wget nor curl found. Please install one of them."
        exit 1
    fi
    
    # Verify download
    if [[ ! -f "$KAFKA_ARCHIVE" ]]; then
        echo "Error: Download failed!"
        exit 1
    fi
    
    echo "Extracting Kafka..."
    tar -xzf "$KAFKA_ARCHIVE"
    
    # Rename extracted folder to simple "kafka"
    extracted_folder=$(tar -tzf "$KAFKA_ARCHIVE" | head -1 | cut -f1 -d"/")
    mv "$extracted_folder" kafka
    
    # Clean up archive
    rm "$KAFKA_ARCHIVE"
    
    echo "Kafka extracted to: $KAFKA_DIR"
    kafka_home="$KAFKA_DIR"
fi

# Set up paths
log4j2_path="$kafka_home/config/tools-log4j2.yaml"
kafka_storage="$kafka_home/bin/kafka-storage.sh"

# Verify installation
if [[ ! -d "$kafka_home" ]]; then
    echo "Error: Kafka installation failed!"
    exit 1
fi

if [[ ! -f "$kafka_storage" ]]; then
    echo "Error: Kafka storage script not found: $kafka_storage"
    exit 1
fi

# Make scripts executable (just in case)
chmod +x "$kafka_home/bin"/*.sh

echo "=== Set up Kafka ==="

# Start Kafka in new terminal
gnome-terminal -- bash -c "
    set -e
    cd '$kafka_home' &&
    
    # Set log4j config if file exists
    if [[ -f '$log4j2_path' ]]; then
        export KAFKA_LOG4J_OPTS=\"-Dlog4j.configurationFile=$log4j2_path\"
        echo \"Setting log4j config: \$KAFKA_LOG4J_OPTS\"
    fi
    
    echo \"Generating cluster ID...\" &&
    KAFKA_CLUSTER_ID=\"\$(bin/kafka-storage.sh random-uuid 2>/dev/null)\" &&
    echo \"Generated Cluster ID: \$KAFKA_CLUSTER_ID\" &&
    
    echo \"Formatting Kafka storage...\" &&
    bin/kafka-storage.sh format -t \"\$KAFKA_CLUSTER_ID\" -c config/server.properties --standalone &&
    
    echo \"Starting Kafka server...\" &&
    echo \"Kafka is running! Use Ctrl+C to stop.\" &&
    bin/kafka-server-start.sh config/server.properties ||
    echo \"Kafka stopped with exit code: \$?\"
    
    echo \"\"
    echo \"Kafka server stopped. Press Enter to close terminal.\"
    read
"

echo "Kafka startup initiated in new terminal window."
echo "Check the terminal window for Kafka server status."
