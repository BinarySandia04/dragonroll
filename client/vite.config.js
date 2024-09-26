import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@plugins': fileURLToPath(new URL('./plguins', import.meta.url)),
    }
  },
  proxy: {
    '/api': {
        target: 'https://localhost:44305',
        changeOrigin: true,
        secure: false,      
        ws: true,
    }
  },
  build: {
    target: 'esnext'
  }
})
