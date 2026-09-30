import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
  },
  build: {
    // The 3D scene chunk is mostly three.js itself (~230 kB gzip). It is
    // loaded lazily after first paint, never on the critical path.
    chunkSizeWarningLimit: 900,
  },
});
