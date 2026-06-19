import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
    strictPort: false
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'firebase-vendor': ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          'python-curriculum': ['./data/curriculum.js'],
          'sql-curriculum': ['./data/sql-curriculum.js'],
          'dsa-curriculum': ['./data/dsa-curriculum.js']
        }
      }
    }
  }
});
