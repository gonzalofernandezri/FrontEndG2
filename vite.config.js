import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost/Reto_2/BackEndG2', // 🔹 carpeta donde está conexion.php
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // elimina /api al pasar la ruta a XAMPP
      }
    }
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
