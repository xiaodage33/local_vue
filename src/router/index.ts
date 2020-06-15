import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,

  routes
})

export default router
