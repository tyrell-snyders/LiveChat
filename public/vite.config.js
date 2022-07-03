import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    define: { global: 'window' },
    plugins: [react()],
    server: {
        cors: true,
        open: true,
        port: 3030
    }
})