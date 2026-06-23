import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        artistas: resolve(__dirname, 'artistas.html'),
        obras: resolve(__dirname, 'obras.html'),
      }
    }
  }
});
