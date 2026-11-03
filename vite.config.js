
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
     tailwindcss(),
    babel({ presets: [reactCompilerPreset()] })
  ],
   server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000', // <-- Change to your backend port
        changeOrigin: true,
        secure: false,
      }
    }
  }
})

