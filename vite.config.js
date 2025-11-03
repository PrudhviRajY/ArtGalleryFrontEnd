import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Set base to '/ecommerce/' so built assets resolve under that path when deployed
  base: '/ecommerce/',
  plugins: [react()],
})
