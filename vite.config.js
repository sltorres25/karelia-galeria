import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        artistas: resolve(__dirname, 'artistas.html'),
        obras: resolve(__dirname, 'obras.html'),
        faq: resolve(__dirname, 'faq.html'),
        'artista-detalle': resolve(__dirname, 'artista-detalle.html'),
      }
    }
  }
});
