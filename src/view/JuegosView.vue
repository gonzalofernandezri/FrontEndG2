<template>
  <div
    class="flex flex-col items-center grow
           bg-gray-100
           pt-[160px] sm:pt-[180px] md:pt-[200px] lg:pt-[220px]
           px-4 pb-16 min-h-screen"
  >
    <div class="w-full max-w-6xl flex flex-col items-center gap-6 lg:mt-1 md:mt-1  mt-40">
      
      <div class="flex flex-col gap-4 w-[400px] lg:w-full md:w-[500px] ">
        <input
          type="text"
          v-model="busqueda"
          @input="juegosFiltrados"
          placeholder="Buscar juego..."
          class="border p-2 rounded flex-1 "
        />
      </div>

      <ul class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <li
          v-for="juego in juegos"
          :key="juego.id"
          @click="abrirModal(juego)"
          class="bg-blue-500/70 p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <div class="rounded-lg shadow-md overflow-hidden flex flex-col bg-purple-400/50 h-full min-h-[300px]">
            <div class="w-full h-48 bg-gray-300">
              <img
                v-if="juego.imagen"
                :src="'/api/img/juegos/' + juego.imagen"
                :alt="juego.titulo"
                class="w-full h-48 object-cover border-8 border-[#948efe]"
              />
            </div>

            <div class="p-4 flex flex-col gap-2 flex-1">
              <strong class="text-xl font-bold text-white">{{ juego.titulo }}</strong>
              <div class="text-gray-100 text-sm grid grid-cols-2 gap-x-4 gap-y-1">
                <div>
                  <span class="font-bold text-white">Plataforma:</span>
                  {{ JSON.parse(juego.plataformas).join(", ") }}
                </div>
                <div>
                  <span class="font-bold text-white">Género:</span> {{ juego.genero }}
                </div>
                <div class="col-span-2">
                  <span class="font-bold text-white">Descripción:</span>
                  {{ juego.descripcion }}
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <div
        v-if="modalVisible"
        class="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
        @click.self="cerrarModal"
      >
        <div class="bg-[#948efe] rounded-lg w-full max-w-md shadow-lg overflow-hidden">
          <h2 class="text-2xl font-bold text-white p-5">{{ juegoSeleccionado?.titulo }}</h2>

          <div class="p-5">
            <div class="w-full h-48 bg-gray-300 rounded-lg overflow-hidden">
              <img
                v-if="juegoSeleccionado?.imagen"
                :src="'/api/img/juegos/' + juegoSeleccionado.imagen"
                :alt="juegoSeleccionado.titulo"
                class="w-full h-48 object-cover"
              />
            </div>
          </div>

          <div class="p-6 flex flex-col gap-4">
            <div class="text-sm text-gray-100 grid grid-cols-2 gap-2">
              <div class="text-white">
                <strong>Plataforma:</strong>
                {{ juegoSeleccionado?.plataformas ? JSON.parse(juegoSeleccionado.plataformas).join(", ") : '' }}
              </div>
              <div class="text-white"><strong>Género:</strong> {{ juegoSeleccionado?.genero }}</div>
            </div>
            <p class="text-white">
              {{ juegoSeleccionado?.descripcion }}
            </p>

            <div class="flex justify-end gap-4">
              <button
                @click="cerrarModal"
                class="bg-blue-500/70 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';

// --- Estado Reactivo ---
const juegos = ref([]); // Almacena el array de juegos
const busqueda = ref(''); // Término de búsqueda del usuario
const modalVisible = ref(false); // Controla la visibilidad del modal
const juegoSeleccionado = ref(null); // Juego que se muestra actualmente en el modal

// Función para obtener todos los juegos al cargar el componente
async function cargarJuegos() {
  const res = await fetch('/api/juegos_api.php');
  juegos.value = await res.json();
}

// Función de filtrado: Envía el término de búsqueda al servidor PHP
async function juegosFiltrados() {
  const query = busqueda.value.trim();
  const res = await fetch(`/api/juegos_api.php?query=${encodeURIComponent(query)}`);
  juegos.value = await res.json();
}

// Lógica para abrir el modal con los datos del juego seleccionado
function abrirModal(juego) {
  juegoSeleccionado.value = juego;
  modalVisible.value = true;
}

// Lógica para cerrar el modal y resetear la selección
function cerrarModal() {
  modalVisible.value = false;
}

// Hook de ciclo de vida: Carga inicial de datos
onMounted(cargarJuegos);
</script>

<style>
/* Estilos para transiciones de tipo 'fade' (desvanecimiento) */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>