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
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@pokemon': fileURLToPath(new URL('./src/module/pokemon', import.meta.url)),
      '@common': fileURLToPath(new URL('./src/module/common', import.meta.url)),
    },
  },
})
