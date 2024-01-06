import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
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
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router
