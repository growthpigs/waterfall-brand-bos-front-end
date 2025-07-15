import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: false,
    cors: true,
    hmr: {
      host: '127.0.0.1',
      port: 5173,
    },
  },
});
