<template>
  <div class="flex items-center justify-center grow bg-gray-100 pt-40 md:pt-30">
    <div class="flex flex-col items-center min-h-screen p-4">
      <!-- Búsqueda -->
      <div class="w-full flex justify-center mb-4">
        <input
          @input="juegosFiltrados"
          type="text"
          v-model="busqueda"
          placeholder="Buscar juego..."
          class="border p-2 rounded w-full max-w-3xl"
        />
      </div>

      <div class="w-full max-w-6xl sm:min-w-xl">
        
        <ul
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6  place-items-center"
        >
          <li
            v-for="juego in juegos"
            :key="juego.id"
            class="bg-gray-100 p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 w-[370px] "
            @click="abrirModal(juego)"
          >
            <div class="rounded-lg shadow-md overflow-hidden flex flex-col bg-white h-full min-h-[373px] w-[333px] p-5">
              <img
                :src="'../../gamefest_resources/games/' + juego.imagen"
                :alt="'Imagen de ' + juego.titulo"
                class="w-full h-40 object-cover rounded"
              />
              <h3 class="font-sans md:font-serif">
                Titulo: {{ juego.titulo }}
              </h3>
              <p class="font-sans md:font-serif">
                Plataforma: {{ JSON.parse(juego.plataformas).join(", ") }}
              </p>
              <p class="font-sans md:font-serif">Género: {{ juego.genero }}</p>
              <p class="font-sans md:font-serif">
                Descripción: {{ juego.descripcion }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <transition name="fade">
      <div
        v-if="modalVisible"
        class="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
        @click.self="cerrarModal"
      >
        <div
          class="bg-white rounded-lg w-full max-w-md shadow-lg overflow-hidden transform transition-transform duration-200 scale-95 relative"
        >
          <button
            @click="cerrarModal"
            class="absolute top-0 right-3 text-red-400 text-3xl font-bold hover:text-red-800 hover:scale-110 transition-all"
            aria-label="Cerrar modal"
          >
            x
          </button>

          <div class="p-5">
            <img
              v-if="juegoSeleccionado"
              :src="
                '../../gamefest_resources/games/' + juegoSeleccionado.imagen
              "
              :alt="juegoSeleccionado.titulo"
              class="w-full h-64 object-cover rounded-lg"
            />
          </div>

          <div class="p-5 flex flex-col gap-2">
            <h2 class="text-2xl font-bold">{{ juegoSeleccionado.titulo }}</h2>
            <p>
              <strong>Plataforma:</strong>
              {{
                juegoSeleccionado.plataformas
                  ? JSON.parse(juegoSeleccionado.plataformas).join(", ")
                  : ""
              }}
            </p>
            <p><strong>Género:</strong> {{ juegoSeleccionado.genero }}</p>
            <p>
              <strong>Descripción:</strong> {{ juegoSeleccionado.descripcion }}
            </p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const juegos = ref([]);
const busqueda = ref("");
const modalVisible = ref(false);
const juegoSeleccionado = ref(null);

// Cargar todos los juegos
async function cargarJuegos() {
  const res = await fetch("/api/juegos_api.php");
  juegos.value = await res.json();
}

// Filtrar juegos
async function juegosFiltrados() {
  const query = busqueda.value.trim();
  const res = await fetch(
    `/api/juegos_api.php?query=${encodeURIComponent(query)}`,
  );
  juegos.value = await res.json();
}

// Abrir modal
function abrirModal(juego) {
  juegoSeleccionado.value = juego;
  modalVisible.value = true;
}

// Cerrar modal
function cerrarModal() {
  modalVisible.value = false;
}

onMounted(cargarJuegos);
</script>

<style>
/* Animación para el modal */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
