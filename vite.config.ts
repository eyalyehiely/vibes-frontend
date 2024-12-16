import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Ensure the app is accessible externally
    port: parseInt(process.env.PORT) || 3000, // Use the PORT environment variable
  },
});