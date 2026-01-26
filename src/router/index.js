import { createRouter, createWebHistory } from 'vue-router'
import Principal from '../view/PrincipalView.vue'
import Juegos from '../view/JuegosView.vue'
import Eventos from '../view/EventosView.vue'

const routes = [
  {
    path: '/',
    redirect: '/principal'
  },
  {
    path: '/principal',
    name: 'Principal',
    component: Principal
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
