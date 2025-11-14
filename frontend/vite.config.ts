import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Accept /api/* in the browser and rewrite to backend / (strip /api)
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      // Keep a direct proxy for /task-lists if anything still calls it
      '/task-lists': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  }
})

