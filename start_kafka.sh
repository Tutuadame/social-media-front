#!/bin/bash

kafka_home="$HOME/Documents/kafka"
log4j2_path="$kafka_home/config/tools-log4j2.yaml"

# Verify paths exist before proceeding
if [[ ! -d "$kafka_home" ]]; then
    echo "Error: Kafka home directory not found: $kafka_home"
    exit 1
fi

if [[ ! -f "$log4j2_path" ]]; then
    echo "Warning: Log4j2 config file not found: $log4j2_path"
fi

# Check if Kafka is already running
if pgrep -f "kafka.Kafka" > /dev/null; then
    echo "Warning: Kafka appears to be already running!"
    echo "Existing Kafka processes:"
    pgrep -f "kafka.Kafka" | xargs ps -p
    read -p "Kill existing processes and continue? (y/N): " kill_existing
    if [[ "$kill_existing" =~ ^[Yy]$ ]]; then
        echo "Stopping existing Kafka processes..."
        pkill -f "kafka.Kafka"
        sleep 3
        # Force kill if still running
        pkill -9 -f "kafka.Kafka" 2>/dev/null || true
        echo "Existing processes stopped."
    else
        echo "Exiting. Stop Kafka manually first."
        exit 1
    fi
fi

# Open terminal with error handling
gnome-terminal -- bash -c "
    cd $kafka_home &&
        
    echo \"Starting Kafka server...\" &&
    bin/kafka-server-start.sh config/server.properties 2>&1 | tee kafka.log ||
    echo \"Kafka failed with exit code: \$?\"
    
    read
"
