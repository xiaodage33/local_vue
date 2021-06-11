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
    //下面是k8s
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
        path: '/test_error',
        name: 'search_error_test',
        component: () => import('../views/Login/search_error_test.vue')
    },
    {
        path: '/bawangzhan',
        name: 'bawangzhan',
        component: () => import('../views/bawangzhan.vue')
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