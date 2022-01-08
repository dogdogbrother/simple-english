import { createRouter, createWebHistory } from 'vue-router'
import Home from './modules/home'

const routes = [
  { 
    path: '/login', 
    component: () => import('@/view/login/index.vue')
  },
  ...Home
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router