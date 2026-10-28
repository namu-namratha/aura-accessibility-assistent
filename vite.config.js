import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    strictPort: true
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        accessibility: resolve(import.meta.dirname, 'pages/accessibility.html'),
        assistant: resolve(import.meta.dirname, 'pages/assistant.html'),
        dashboard: resolve(import.meta.dirname, 'pages/dashboard.html'),
        login: resolve(import.meta.dirname, 'pages/login.html'),
        register: resolve(import.meta.dirname, 'pages/register.html'),
        settings: resolve(import.meta.dirname, 'pages/settings.html')
      }
    }
  }
});
