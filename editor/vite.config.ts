import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// Use URL to resolve paths in ESM without requiring Node type defs

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      // Resolve the local built library to avoid pulling a second installed copy
      // ESM-safe __dirname
      'fcstyle': new URL('../project/dist/index.esm.js', import.meta.url).pathname,
    },
    // Avoid duplicated React instances when consuming the built library
    dedupe: ['react', 'react-dom', 'react/jsx-runtime'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Remover o additionalData para evitar conflitos com @use/@import
        // O import será feito manualmente no arquivo SCSS
      },
    },
  },
}));