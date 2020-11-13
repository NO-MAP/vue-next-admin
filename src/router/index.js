import { createRouter, createWebHashHistory } from 'vue-router'

import Login from '@/pages/Login.vue';
import NotFound from '@/pages/ErrorPages/NotFound.vue';
import Forbidden from '@/pages/ErrorPages/Forbidden.vue';
import Layout from '@/pages/Layout.vue';
import Home from '@/views/Home.vue';

const defaultRouters = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  }, {
    path: '/401',
    name: 'Forbidden',
    component: Forbidden
  }, {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home
      }
    ]
  }
]

const routes = [
  ...defaultRouters
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
