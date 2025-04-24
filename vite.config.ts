import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

const ReactCompilerConfig = { 
  target: '18'
};

// https://vitejs.dev/config/
export default defineConfig({  
  plugins: [
    react({babel: {plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]]}}),
    mkcert()
  ],
  server: {
    host: 'social.media', // Use custom domain
    port: 3000,
    cors: {
      origin: ['social.media', 'localhost'], // Allow all origins
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Allow specific methods
      allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
    }
  },
});
