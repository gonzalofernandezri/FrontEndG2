import { createRouter, createWebHistory } from 'vue-router'
import Juegos from '../components/Juegos.vue'
import Eventos from '../components/Eventos.vue'

const routes = [
  {
    path: '/',
    redirect: '/principal'
  },
  {
    path: '/juegos',
    name: 'Juegos',
    component: Juegos
  },
  {
    path: '/eventos',
    name: 'Eventos',
    component: Eventos
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
