import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // served from https://miketamis.github.io/adventure/
  base: '/adventure/',
  plugins: [react()],
})
