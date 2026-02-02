<template>
  <div class="flex items-center justify-center grow bg-gray-100 fondo">
    <div class="justify-center flex flex-col items-center space-y-4 "> 
<div class="bg-gradient-to-r from-blue-400/50 to-purple-400/50 text-white size-100 font-black text-center rounded-lg border-black p-6 backdrop-blur-sm">

        <h2 class="text-xl my-1">Inicio de Sesion</h2><br>
        <form @submit.prevent="">
          <div>
            <label>Usuario:</label><br>
            <input type="text" v-model="usuario" class="bg-transparent text-white placeholder-white border border-white rounded-md py-1 my-3 px-2 focus:outline-none focus:ring-2 focus:ring-white"  />
          </div>
          <div>
            <label>Contraseña:</label><br>
            <input type="password" v-model="contraseña" class="bg-transparent text-white placeholder-white border border-white rounded-md py-1 my-3 px-2 focus:outline-none focus:ring-2 focus:ring-white" />
          </div>
          <button class="my-5 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" @click="login" type="submit">Inicar Sesion</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2'
import { ref } from 'vue'

const usuario = ref('')
const contraseña = ref('')

function mostrarAlerta(titulo, tipo = 'info') {
  Swal.fire({
    title: titulo,
    icon: tipo,
    background: '#1e1e2f',
    color: '#f5f5f5',
    confirmButtonColor: '#4f46e5'
  })
}

async function login() {

  if (!usuario.value) {
    mostrarAlerta('El nombre de usuario es obligatorio', 'error')
    return
  }

  if (!contraseña.value) {
    mostrarAlerta('La contraseña es obligatoria', 'error')
    return
  }


  const params = new URLSearchParams()
  params.append('username', usuario.value)
  params.append('password', contraseña.value)

  try {
    const res = await fetch('/api/login_api.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      credentials: 'include', // <--- envía la cookie PHP
      body: new URLSearchParams({
        username: usuario.value,
        password: contraseña.value
      })
    })

    const data = await res.json()
    console.log(data)

    if (data.success) {
      mostrarAlerta(`Usuario logueado: ${data.username}`, 'success')  
      // localStorage.setItem('user_id', data.user_id)
      // localStorage.setItem('username', data.username)
      // localStorage.setItem('role', data.role)       
      // localStorage.setItem('logged_in', 'true')
      window.location.href="/perfiles";
    } else {
      mostrarAlerta(data.message || 'Error al iniciar sesión', 'error')
    }

  } catch (error) {
    mostrarAlerta('No se ha podido conectar con el servidor', 'error')
    console.error(error)
  }
}
</script>
