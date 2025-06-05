import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base:'/',
  
  server: {
    allowedHosts: ['https://depeaceacademy.onrender.com','https://depeacebackend.onrender.com'],
  }
})
