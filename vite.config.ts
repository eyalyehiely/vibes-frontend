import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allows the server to be accessible externally
    port: parseInt(process.env.PORT) || 4173, // Uses the PORT environment variable or defaults to 4173
  },
  build: {
    outDir: 'dist', // Ensure the build output goes to 'dist'
  },
});