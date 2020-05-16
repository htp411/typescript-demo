import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    meta: { title: '首页' },
    component: () => import('../views/Home/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: { title: '用户登录' },
    component: () => import('../views/Login/index.vue')
  }
  // {
  //   // path: '/',
  //   // name: 'Home',
  //   // component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
