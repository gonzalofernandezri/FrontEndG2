<template>
    <div class="w-full max-w-6xl mx-auto p-6 flex flex-col items-center gap-6">
      <div class="flex flex-col sm:flex-row gap-4 w-full">
        <select v-model="tipo" @change="cambiarFiltros"  class="border p-2 rounded flex-1">
          <option value="">Todos</option>
          <option value="Presentación">Presentación</option>
          <option value="Charla">Charla</option>
          <option value="Taller">Taller</option>
          <option value="Mesa Redonda">Mesa Redonda</option>
          <option value="Exhibición">Exhibición</option>
          <option value="Torneo">Torneo</option>
          <option value="Networking">Networking</option>
          <option value="Competición">Competición</option>
        </select>
      
        <input 
          type="date" 
          class="border p-2 rounded flex-1"
          min="2025-02-13" 
          max="2025-02-15"
          v-model="fecha" 
          @change="cambiarFiltros">

        <label class="flex items-center gap-2 flex-1">
          <input type="checkbox" v-model="soloConPlazas" @change="cambiarFiltros">
          Plazas libres
        </label>
      </div>

      <ul class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <li 
            v-for="evento in eventos" 
            :key="evento.id" 
            class="bg-gray-100 p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"  
          >
          <!-- TARJETA INTERIOR -->
          <div @click="abrirModal(evento)" class="rounded-lg shadow-md overflow-hidden flex flex-col bg-white h-full min-h-[300px]">
  
            <!-- Imagen -->
            <img 
              v-if="evento.imagen" 
              :src="`/gamefest_resources/events/${evento.imagen}`" 
              alt="Imagen del evento" 
              class="w-full h-48 object-cover"
            />

            <!-- Datos -->
            <div class="p-4 flex flex-col gap-2 flex-1">
              <strong class="text-xl">{{ evento.titulo }}</strong>

              <div class="text-gray-600 text-sm grid grid-cols-2 gap-x-4 gap-y-1">
                <div>
                  <span class="font-medium">Tipo:</span> {{ evento.tipo }}
                </div>
                <div>
                  <span class="font-medium">Plazas libres:</span> {{ evento.plazasLibres }}
                </div>

                <div>
                  <span class="font-medium">Fecha:</span> {{ evento.fecha }}
                </div>
                <div>
                  <span class="font-medium">Hora:</span> {{ evento.hora }}
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>


      <div class="flex gap-4">
        <button 
          @click="anteriorPagina" 
          :disabled="paginaActual === 1"
          class="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300 disabled:text-gray-600">
          Anterior
        </button>
        
        <button 
          @click="siguientePagina" 
          :disabled="paginaActual === totalPaginas"
          class="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300 disabled:text-gray-600">
          Siguiente
        </button>
      </div>

      <!-- MODAL -->
      <div 
        v-if="eventoSeleccionado"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        @click.self="cerrarModal"
      >
        <div class="bg-white rounded-lg w-full max-w-md shadow-lg overflow-hidden ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-red-500 absolute top-4 right-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>

          <h2 class="text-2xl font-bold p-5">
              {{ eventoSeleccionado.titulo }}
          </h2>
          
          <!-- Imagen del evento -->
          <div class="p-5">
            <img 
              v-if="eventoSeleccionado.imagen"
              :src="`/gamefest_resources/events/${eventoSeleccionado.imagen}`"
              alt="Imagen del evento"
              class="w-full h-48 object-cover rounded-lg"
            />
          </div>

          <!-- Contenido del modal -->
          <div class="p-6 flex flex-col gap-4 p-5">
            <div class="text-sm text-gray-600 grid grid-cols-2 gap-2">
              <div><strong>Tipo:</strong> {{ eventoSeleccionado.tipo }}</div>
              <div><strong>Plazas:</strong> {{ eventoSeleccionado.plazasLibres }}</div>
              <div><strong>Fecha:</strong> {{ eventoSeleccionado.fecha }}</div>
              <div><strong>Hora:</strong> {{ eventoSeleccionado.hora }}</div>
            </div>

            <p class="text-gray-700">
              {{ eventoSeleccionado.descripcion }}
            </p>

            <div class="flex justify-between">
              <button 
                @click="inscribirse"
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Apuntarme
              </button>
              <button 
                @click="cerrarModal"
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Cerrar
              </button> 
            </div>

          </div>
        </div>

      </div>

    </div>
</template>


<script setup>
import { ref, onMounted} from 'vue'

const eventos = ref([])
const tipo = ref('')
const fecha = ref('')
const soloConPlazas = ref(false)

var paginaActual = 1
var totalPaginas = 2
const eventosPorPagina = 9

async function calcularPaginas(){
  const params = new URLSearchParams()
  
  if (tipo.value) {
    params.append('tipo', tipo.value)
  }

  if (fecha.value) {
    params.append('fecha', fecha.value)
  }

  if (soloConPlazas.value){
    params.append('plazas', 'true')
  } 

  const res = await fetch(`/api/eventostodo_api.php?${params.toString()}`)
  const data = await res.json();
  totalPaginas = Math.ceil(Number(data) / eventosPorPagina);
}

async function cargarEventos() {
  const params = new URLSearchParams()

  if (tipo.value) {
    params.append('tipo', tipo.value)
  }

  if (fecha.value) {
    params.append('fecha', fecha.value)
  }

  if (soloConPlazas.value){
    params.append('plazas', 'true')
  } 

  params.append('pagina', paginaActual)

  const res = await fetch(`/api/eventos_api.php?${params.toString()}`)
  const data = await res.json()

  eventos.value = data;
}

function cambiarFiltros() {
  paginaActual = 1
  calcularPaginas()
  cargarEventos()
}

function siguientePagina() {
  if (paginaActual < totalPaginas) {
    paginaActual++
    cargarEventos()
  }
}

function anteriorPagina() {
  if (paginaActual > 1) {
    paginaActual--
    cargarEventos()
  }
}
onMounted(() => {
  cargarEventos();
  calcularPaginas();
});

const eventoSeleccionado = ref(null)

const abrirModal = (evento) => {  
  eventoSeleccionado.value = evento
}

const cerrarModal = () => {
  eventoSeleccionado.value = null
}

async function inscribirse(){
  const params = new URLSearchParams()

  const userId = localStorage.getItem('user_id')
  const eventoId = eventoSeleccionado.value.id
  const fechaHoy = new Date().toISOString().split('T')[0]

  params.append('user_id', userId)
  params.append('evento_id', eventoId)
  params.append('fecha', fechaHoy)

  const res = await fetch(`/api/apuntarseEvento_api.php?${params.toString()}`)
  console.log(res)
  cerrarModal();
  
}

</script>

