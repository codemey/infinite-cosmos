import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
        redirect: '/index',
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: '/index',
                name: 'index',
                component: () => import('@/views/index.vue'),
            },
            {
                path: '/code-snippet',
                name: 'code-snippet',
                component: () => import('@/views/code-snippet/index.vue'),
            },
            {
                path: '/json-to-table',
                name: 'json-to-table',
                component: () => import('@/views/json-to-table/index.vue'),
            },
            {
                path: '/report-management',
                name: 'report-management',
                component: () => import('@/views/report-management/index.vue'),
            },
            {
                path: '/pwd-management',
                name: 'pwd-management',
                component: () => import('@/views/pwd-management/index.vue'),
            },
            {
                path: '/translate',
                name: 'translate',
                component: () => import('@/views/translate/index.vue'),
            },
            {
                path: '/aliyun',
                name: 'aliyun',
                component: () => import('@/views/aliyun/index.vue'),
            },
            {
                path: '/export-api-doc',
                name: 'export-api-doc',
                component: () => import('@/views/export-api-doc/index.vue'),
            },
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router
