<template>
  <div class="flex items-center justify-center grow bg-purple-200/40 pt-30">
    <div class="flex flex-col items-center min-h-screen p-4 mt-20 lg:mt-[5px]">
      <!-- Búsqueda -->
      <div class="w-full max-w-4xl mx-auto mb-4 md:mb-2 px-4">
        <input
          @input="juegosFiltrados"
          type="text"
          v-model="busqueda"
          placeholder="Buscar juego..."
          class="border border-black p-2 rounded w-full  text-black"
        />
      </div>

      <!-- Lista de juegos -->
      <div class="w-full max-w-6xl px-20 md:m-5">
        <ul
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center"
        >
          <li
            v-for="juego in juegos"
            :key="juego.id"
            @click="abrirModal(juego)"
            :class="[
              'rounded-xl transition-transform duration-300 w-full sm:max-w-[500px] lg:max-w-none',
              'border-2 border-transparent shadow-md',
              'hover:scale-105 hover:shadow-2xl hover:border-purple-400 hover:bg-purple-50/20',
            ]"
          >
            <!-- TARJETA INTERIOR -->
            <div
              class="rounded-lg overflow-hidden flex flex-col h-full min-h-[300px] p-2 bg-gradient-to-tr bg-gray-600"
            >
              <!-- Imagen -->
              <img
                v-if="juego.imagen"
                :src="'../../gamefest_resources/games/' + juego.imagen"
                :alt="'Imagen de ' + juego.titulo"
                class="w-full h-50 object-cover rounded-lg mb-2  "
              />

              <!-- Datos -->
              <div class="flex flex-col gap-2 flex-1 text-purple-700/50">
                <strong class="text-xl text-white">{{ juego.titulo }}</strong>

                <div class="text-white font-blod  text-sm grid grid-cols-2 gap-2">
                  <div>
                    <span class="font-medium">Plataforma:</span>
                    {{ JSON.parse(juego.plataformas).join(", ") }}
                  </div>
                  <div>
                    <span class="font-medium">Género:</span> {{ juego.genero }}
                  </div>

                  <div class="col-span-2">
                    <span class="font-medium">Descripción:</span>
                    {{ juego.descripcion }}
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- MODAL -->
    <transition name="fade">
      <div
        v-if="modalVisible"
        class="fixed inset-0 bg-black/88 flex items-center justify-center z-50"
        @click.self="cerrarModal"
      >
        <div
          class=" bg-gray-600 text-white rounded-lg w-full max-w-md shadow-lg overflow-hidden transform transition-transform duration-200 scale-95 relative "
        >
          <!-- Botón cerrar -->
          

          <!-- Imagen grande -->
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

          <!-- Datos del juego -->
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
