<template>
  <div class="flex items-center justify-center grow bg-gray-100 fondo">
    <div class="justify-center flex flex-col items-center space-y-4 "> 
      <div class="bg-gradient-to-r from-blue-400/50 to-purple-400/50 text-white size-100 font-black text-center rounded-lg border-black p-6 backdrop-blur-sm mt-80 lg:mt-20 md:mt-20">
        <h2 class="text-xl my-1">Registro de Usuario</h2><br>
        
        <form @submit.prevent="registrarUsuario">
          <div>
            <label>Usuario:</label><br>
            <input type="text" v-model="usuario" class="bg-transparent text-white placeholder-white border border-white rounded-md py-1 my-2 px-2 focus:outline-none focus:ring-2 focus:ring-white"  />
          </div>
          <div>
            <label>Email:</label><br>
            <input type="text" v-model="email" class="bg-transparent text-white placeholder-white border border-white rounded-md py-1 my-2 px-2 focus:outline-none focus:ring-2 focus:ring-white"  />
          </div>
          <div>
            <label>Contraseña:</label><br>
            <input type="password" v-model="contraseña" class="bg-transparent text-white placeholder-white border border-white rounded-md py-1 my-2 px-2 focus:outline-none focus:ring-2 focus:ring-white" />
          </div>
          <button class="my-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" type="submit">Registrar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue' // Importación para manejar el estado reactivo
import Swal from 'sweetalert2' // Importación de la librería para alertas visuales

// Definición de variables reactivas para capturar los datos del formulario
const usuario = ref('')
const email = ref('')
const contraseña = ref('')

// Función reutilizable para configurar y mostrar mensajes de SweetAlert2
function mostrarAlerta(titulo, tipo = 'info') {
  Swal.fire({
    title: titulo,
    icon: tipo,
    background: '#1e1e2f', // Fondo oscuro personalizado
    color: '#f5f5f5',      // Texto claro
    confirmButtonColor: '#4f46e5' // Color del botón de confirmación
  })
}

// Función principal para procesar el registro
async function registrarUsuario() {
  // --- Validaciones previas en el cliente ---
  if (!usuario.value) {
    mostrarAlerta('El nombre de usuario es obligatorio', 'error')
    return
  }

  if (!email.value) {
    mostrarAlerta('El email es obligatorio', 'error')
    return
  }

  if (!contraseña.value) {
    mostrarAlerta('La contraseña es obligatoria', 'error')
    return
  }

  try {
    // Envío de datos al endpoint PHP mediante una petición POST asíncrona
    const res = await fetch('/api/usuarios_api.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usuario: usuario.value,
        email: email.value,
        contraseña: contraseña.value
      })
    })

    // Conversión de la respuesta del servidor a objeto JSON
    const data = await res.json()

    // Si el backend confirma que el registro fue exitoso
    if (data.correcto) {
      mostrarAlerta(data.mensaje, 'success')

      // Limpieza de los campos del formulario
      usuario.value = ''
      email.value = ''
      contraseña.value = ''
      
      // Redirección manual a la vista de login
      window.location.href="/login";

    } else {
      // Manejo de errores controlados (ej: usuario ya existe)
      mostrarAlerta(data.mensaje || 'Error al registrar usuario', 'error')
    }

  } catch (err) {
    // Manejo de errores de red o del servidor (ej: servidor apagado)
    console.error(err)
    mostrarAlerta('Error de conexión con el servidor', 'error')
  }
}
</script>