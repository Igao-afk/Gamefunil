import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: ['es2020', 'chrome80', 'safari14'],
    chunkSizeWarningLimit: 500,

    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor'
          }
          if (id.includes('node_modules/framer-motion')) return 'framer-motion'
          if (id.includes('node_modules/howler')) return 'howler'
          if (id.includes('node_modules/zustand')) return 'zustand'

          if (id.includes('/stages/Stage1')) return 'stage-1'
          if (id.includes('/stages/Stage2')) return 'stage-2'
          if (id.includes('/stages/Stage3')) return 'stage-3'
          if (id.includes('/stages/Stage4')) return 'stage-4'
          if (id.includes('/stages/Stage5')) return 'stage-5'
        },
      },
    },
  },
})
