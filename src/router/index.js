import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: '丁字湾数字孪生',
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
