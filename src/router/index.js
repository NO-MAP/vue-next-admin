import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/pages/Login.vue';
import NotFound from '@/pages/ErrorPages/NotFound.vue';
import Forbidden from '@/pages/ErrorPages/Forbidden.vue';
import Layout from '@/pages/Layout.vue';
import Home from '@/views/Home.vue';

const defaultRouters = [
  {
    path: '/Login',
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
    redirect: '/Home',
    component: Layout,
    children: [
      {
        path: '/Home',
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
  history: createWebHistory(),
  routes
})

export default router
