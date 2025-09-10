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
  ],
  server: {
    host: 'social.media',
    port: 3000,
    https: {
      pfx: './certs/socialmedia.p12',
      passphrase: 'Waterpolo010'
    },
    cors: {
      origin: ['https://social.media:3000'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
    }
  },
});
