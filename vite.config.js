import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': '/src',
        },
    },
    server: {
        host: '0.0.0.0',
        port: 5100,
        hmr: {
            overlay: true,
        },
        proxy: {
            '/api/': {
                target: 'http://localhost:3000/',
                ws: true,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api\//, '/'), // 如果需要重写请求路径
            },
        }
    },
})
