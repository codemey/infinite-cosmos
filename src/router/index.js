import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/index.vue'),
    },
    {
        path: '/codeSnippet',
        name: 'codeSnippet',
        component: () => import('@/views/codeSnippet/index.vue'),
    },
    {
        path: '/jsonToTable',
        name: 'jsonToTable',
        component: () => import('@/views/jsonToTable/index.vue'),
    },
    {
        path: '/reportManagement',
        name: 'reportManagement',
        component: () => import('@/views/reportManagement/index.vue'),
    },
    {
        path: '/pwdManagement',
        name: 'pwdManagement',
        component: () => import('@/views/pwdManagement/index.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router
