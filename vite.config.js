import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver({ importStyle: "sass" })],
            dirs: ['src/components'],   //自动引入自定义组件
            dts: 'src/components.d.ts'  //生成组件配置文件
        }),
    ],
    resolve: {
        alias: {
            '@': '/src',
        },
        extensions: ['.js', '.vue'],
    },
    // css: {
    //     preprocessorOptions: {
    //         scss: {
    //             additionalData: `@use "@/style/element/index.scss" as *;`,
    //         },
    //     },
    // },
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
            '/api-aliyun/': {
                target: 'https://openapi.alipan.com/',
                ws: true,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api-aliyun\//, '/'), // 如果需要重写请求路径
            },
        }
    },
})
