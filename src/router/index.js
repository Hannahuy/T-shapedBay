import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: '丁字湾典型生态数字孪生系统',
        component: () => import('../components/Homepage.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});

router.beforeEach((to) => {
    document.title = to.name;
});

export default router;
