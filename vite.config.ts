import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // GitHub Pages will serve from root since it's username.github.io
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
