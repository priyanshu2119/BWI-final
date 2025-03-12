import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  optimizeDeps: {
    exclude: [
      'framer-motion', 
      'react-router-dom',
      'lucide-react',
      'react-confetti'
      // Removed particles-bg
    ],
    include: [
      'react',
      'react-dom',
      '@headlessui/react',
      'zustand'
    ]
  },
  build: {
    sourcemap: true,
    commonjsOptions: {
      transformMixedEsModules: true
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'ui': ['@headlessui/react', 'framer-motion']
        }
      }
    }
  },
  server: {
    port: 5173,
    strictPort: false,
    watch: {
      usePolling: true
    }
  }
});
