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
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router
