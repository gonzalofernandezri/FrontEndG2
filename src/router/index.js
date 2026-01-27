import { createRouter, createWebHistory } from 'vue-router'
import Principal from '../view/PrincipalView.vue'
import Juegos from '../view/JuegosView.vue'
import Eventos from '../view/EventosView.vue'
import Usuarios from '../view/Usuarios.vue'
import Login from '../view/Login.vue'


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
  },
    {
    path: '/usuarios',
    name: 'Usuarios',
    component: Usuarios
  },
      {
    path: '/login',
    name: 'Login',
    component: Login
  }

]



const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router