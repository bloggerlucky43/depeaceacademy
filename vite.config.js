import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  server: {
    allowedHosts: ['c408-102-89-83-10.ngrok-free.app'],
  }
})
