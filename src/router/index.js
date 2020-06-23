import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
const routes = [
    {
        path: '/',
        redirect: "k8slog",
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login/login.vue')
    },
    {
        path: '/add',
        name: 'Add',
        component: () => import('../views/Add/Add.vue')
    },
    {
        path: '/trae',
        name: 'Trae',
        component: () => import('../views/Login/Trae.vue')
    },
    {
        path: '/k8slog',
        name: 'kubernetes_log',
        component: () => import('../views/Login/kubernetes_log.vue')
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
];
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});
export default router;
//# sourceMappingURL=index.js.map