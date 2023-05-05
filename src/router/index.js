import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
    {
        path: '',
        redirect: '/dinosaur'
    },
    {
        path: '/dinosaur',
        // name: 'templateSyntax',
        cName: '小恐龙',
        component: () => import('../views/dinosaur/index.vue'),
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})
