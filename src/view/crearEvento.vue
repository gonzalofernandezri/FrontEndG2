<template>
  <div class="flex items-center justify-center grow bg-gray-100 fondo">
    <div class="justify-center flex flex-col items-center space-y-4 pt-30"> 
      <div class="bg-gradient-to-r from-blue-400 to-purple-400 text-white size-160 font-black text-center rounded-lg border-black p-6">
        
        <h2 class="text-xl my-1">Crear Evento</h2><br>

        <form @submit.prevent="registrarUsuario">
          
          <div>
            <label>Título:</label><br>
            <input
              type="text"
              v-model="titulo"
              class="bg-transparent text-white placeholder-white border border-white rounded-md py-1 my-2 px-2 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div>
            <label>Tipo:</label><br>
            <input
              type="text"
              v-model="tipo"
              class="bg-transparent text-white placeholder-white border border-white rounded-md py-1 my-2 px-2 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
    <div class="flex flex-row justify-center">
          <div>
            <label>Fecha:</label><br>
            <input
              type="date"
              v-model="fecha"
              class="bg-transparent text-white border border-white rounded-md py-1 my-2 px-2 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          

          <div>
            <label>Hora:</label><br>
            <input
              type="time"
              v-model="hora"
              class="bg-transparent text-white border border-white rounded-md py-1 my-2 px-2 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div></div>

          <div>
            <label>Plazas:</label><br>
            <input
              type="number"
              v-model="plazas"
              min="1"
              class="bg-transparent text-white placeholder-white border border-white rounded-md py-1 my-2 px-2 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div>
            <label>Imagen (URL):</label><br>
            <input
              type="text"
              v-model="imagen"
              class="bg-transparent text-white placeholder-white border border-white rounded-md py-1 my-2 px-2 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div>
            <label>Descripción:</label><br>
            <textarea
              v-model="descripcion"
              rows="3"
              class="bg-transparent text-white placeholder-white border border-white rounded-md py-1 my-2 px-2 focus:outline-none focus:ring-2 focus:ring-white w-full"
            ></textarea>
          </div>

          <button
            type="submit"
            @click="crearEvento"
            class="my-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            Crear Evento
          </button>

        </form>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import Swal from 'sweetalert2'

// Estado (antes data())
const titulo = ref('')
const tipo = ref('')
const fecha = ref('')
const hora = ref('')
const plazas = ref('')
const imagen = ref('')
const descripcion = ref('')
const createdby = ref(1)

// Métodos
function mostrarAlerta(tituloMsg, tipoMsg = 'info') {
  Swal.fire({
    title: tituloMsg,
    icon: tipoMsg,
    background: '#1e1e2f',
    color: '#f5f5f5',
    confirmButtonColor: '#4f46e5'
  })
}

async function crearEvento() {
  // 🔍 Validaciones
  if (!titulo.value) {
    mostrarAlerta('El título es obligatorio', 'error')
    return
  }

  if (!tipo.value) {
    mostrarAlerta('El tipo es obligatorio', 'error')
    return
  }

  if (!fecha.value) {
    mostrarAlerta('La fecha es obligatoria', 'error')
    return
  }

  if (!hora.value) {
    mostrarAlerta('La hora es obligatoria', 'error')
    return
  }

  if (!plazas.value || plazas.value <= 0) {
    mostrarAlerta('Las plazas deben ser mayores que 0', 'error')
    return
  }

  try {
    const res = await fetch('/api/crearEvento_api.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // 👈 ENVÍA LA COOKIE DE SESIÓN
      body: JSON.stringify({
        titulo: titulo.value,
        tipo: tipo.value,
        fecha: fecha.value,
        hora: hora.value,
        plazas: plazas.value,
        imagen: imagen.value,
        descripcion: descripcion.value
      })
    })

    const data = await res.json()
    console.log(data)

    if (data.success) {
      mostrarAlerta('Evento creado correctamente', 'success')
    } else {
      mostrarAlerta(data.message || 'Error al crear el evento', 'error')
    }

  } catch (err) {
    console.error(err)
    mostrarAlerta('Error de conexión con el servidor', 'error')
  }
}
</script>



