import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Plus62Sim',
        short_name: 'Plus62Sim',
        description: 'Life Sim Roguelike Nusantara',
        theme_color: '#2B3576',
        background_color: '#F8F9FA',
        display: 'standalone'
      }
    })
  ],
})