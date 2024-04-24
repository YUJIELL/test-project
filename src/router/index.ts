/*
 * @Date: 2023-09-19 13:38:14
 * @LastEditors: @yujie
 * @LastEditTime: 2024-04-16 13:43:04
 * @Description: 
 */
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GridGenerator from '../views/GridGenerator.vue';
import LowCode from '../views/LowCode/index.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/grid',
      name: 'grid',
      component: GridGenerator
    },
    {
      path: '/lowCode',
      name: 'lowCode',
      component: LowCode
    },
  ]
})

export default router
