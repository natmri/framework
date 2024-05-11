import { defineConfig } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  main: {
    build: {
      lib: {
        entry: './src/main.ts',
      },
    },
  },
  renderer: {
    root: './',
    plugins: [
      vue(),
    ],
  },
})
