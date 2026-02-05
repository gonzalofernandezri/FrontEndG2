<template>
  <div class="flex items-center justify-center grow bg-gray-100 fondo">
    <div class="justify-center flex flex-col items-center space-y-4 pt-60 md:pt-30 pb-5"> 
      <div class="bg-gradient-to-r from-blue-400/50 to-purple-400/50 text-white size-100 font-black text-center rounded-lg border-black p-6 backdrop-blur-sm ">

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
import Swal from 'sweetalert2' // Importación de la librería para mensajes emergentes
import { ref } from 'vue' // Importación para manejar estados reactivos

// Variables reactivas que almacenan las credenciales del usuario
const usuario = ref('')
const contraseña = ref('')

// Función estandarizada para mostrar alertas visuales con diseño oscuro
function mostrarAlerta(titulo, tipo = 'info') {
  Swal.fire({
    title: titulo,
    icon: tipo,
    background: '#1e1e2f',
    color: '#f5f5f5',
    confirmButtonColor: '#4f46e5'
  })
}

// Función principal de autenticación
async function login() {

  // Validaciones básicas de seguridad en el cliente
  if (!usuario.value) {
    mostrarAlerta('El nombre de usuario es obligatorio', 'error')
    return
  }

  if (!contraseña.value) {
    mostrarAlerta('La contraseña es obligatoria', 'error')
    return
  }

  // Preparación de parámetros en formato URLSearchParams (estándar de formularios)
  const params = new URLSearchParams()
  params.append('username', usuario.value)
  params.append('password', contraseña.value)

  try {
    // Petición POST al endpoint de login en el backend PHP
    const res = await fetch('/api/login_api.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      credentials: 'include', // Crucial: Permite que PHP cree y guarde la sesión (PHPSESSID)
      body: new URLSearchParams({
        username: usuario.value,
        password: contraseña.value
      })
    })

    // Parseo de la respuesta JSON del servidor
    const data = await res.json()
    console.log(data)

    // Verificación de éxito según la respuesta del backend
    if (data.success) {
      mostrarAlerta(`Usuario logueado: ${data.username}`, 'success')  
      // Redirección al panel de perfiles tras el inicio de sesión exitoso
      window.location.href="/perfiles";
    } else {
      // Muestra el mensaje de error enviado por el servidor (ej: "Credenciales incorrectas")
      mostrarAlerta(data.message || 'Error al iniciar sesión', 'error')
    }

  } catch (error) {
    // Captura fallos de red o errores inesperados del servidor
    mostrarAlerta('No se ha podido conectar con el servidor', 'error')
    console.error(error)
  }
}
</script>