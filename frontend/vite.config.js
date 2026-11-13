import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dev server runs on http://localhost:5173 ; /api calls are forwarded to Flask (port 5000)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: { '/api': 'http://127.0.0.1:5000' },
  },
})
