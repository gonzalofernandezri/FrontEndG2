  <template>
    <div class="flex items-center justify-center grow bg-gray-100 pt-30">
      <div class="flex flex-col items-center min-h-screen p-4 mt-20 lg:mt-[5px]">
        <!-- Búsqueda -->
      <div class="w-full max-w-4xl mx-auto mb-4 md:mb-2 px-4">
        <input
          @input="juegosFiltrados"
          type="text"
          v-model="busqueda"
          placeholder="Buscar juego..."
          class="border p-2 rounded w-full"
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
              class="border p-3 rounded shadow hover:shadow-lg transition cursor-pointer w-full sm:max-w-[500px] lg:max-w-none"
              @click="abrirModal(juego)"
            >
              <div>
                <img
                  :src="'../../gamefest_resources/games/' + juego.imagen"
                  :alt="'Imagen de ' + juego.titulo"
                  class="w-full h-full sm:h-36 object-cover rounded"
                />
              </div>

              <h3 class="font-sans md:font-serif mt-2">
                Titulo: {{ juego.titulo }}
              </h3>

              <p class="font-sans md:font-serif">
                Plataforma: {{ JSON.parse(juego.plataformas).join(", ") }}
              </p>

              <p class="font-sans md:font-serif">Género: {{ juego.genero }}</p>

              <p class="font-sans md:font-serif text-sm">
                Descripción: {{ juego.descripcion }}
              </p>
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
            class="bg-white rounded-lg w-full max-w-md shadow-lg overflow-hidden transform transition-transform duration-200 scale-95 relative"
          >
            <!-- Botón cerrar arriba a la derecha -->
            <button
              @click="cerrarModal"
              class="absolute top-3 right-3 text-red-600 text-3xl font-bold hover:text-red-800 hover:scale-110 transition-all"
              aria-label="Cerrar modal"
            >
              &times;
            </button>

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
