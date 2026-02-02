<template>
  <div class="flex items-center justify-center grow bg-gray-100 fondo sm:py-10">
    <div class="w-full max-w-6xl bg-blue-400 text-white p-6 rounded-lg shadow-lg back mt-35">

      <h4 class="text-3xl font-bold text-center mb-8">
        ¡BIENVENIDO/A A ElorrietaFest!
      </h4>

      <!-- GRID PRINCIPAL -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

        <!-- ⬅COLUMNA IZQUIERDA -->
        <div class="md:col-span-1 flex flex-col gap-4">

          <div v-if="!usuarioLogeado" class="text-center">
            <span>No tienes cuenta?</span>
            <router-link
              to="/usuarios"
              class="ml-2 underline hover:text-blue-900"
            >
              Regístrate
            </router-link>
          </div>

          <div v-else class="text-center flex flex-col gap-3">
            <p class="font-semibold">
              Hola, {{ usuario?.username }}
            </p>
            <p class="text-sm">
              Rol: {{ usuario?.role }}
            </p>
            <p class="text-sm">
              {{ usuario?.email }}
            </p>

            <button
              class="mt-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded shadow"
              @click="cerrarSesion"
            >
              Cerrar sesión
            </button>

            <router-link
              v-if="roluser === 'ADMIN'"
              to="/crearEvento"
              class="bg-purple-300 text-white font-bold rounded p-3 hover:bg-purple-500 text-center"
            >
              Crear eventos
            </router-link>
          </div>

        </div>

        <!-- COLUMNA DERECHA -->
        <div class="md:col-span-2">

          <h3 class="text-2xl font-bold mb-4 text-white">
            Mis eventos
          </h3>

          <ul
            v-if="eventos.length"
            class="bg-white rounded-lg divide-y text-gray-800 max-h-100 overflow-y-auto"
          >
            <li
              v-for="evento in eventos"
              :key="evento.id"
              class="p-4 flex justify-between items-center hover:bg-gray-50 h-25"
            >
              <div @click="abrirModal(evento)">
                <p class="font-semibold">
                  {{ evento.titulo }}
                </p>
                <p class="text-sm text-gray-600">
                  {{ evento.fecha }} · {{ evento.hora }} · {{ evento.tipo }}
                </p>
              </div>
            </li>
          </ul>

          <p
            v-else
            class="text-white mt-4"
          >
            No estás apuntado a ningún evento todavía.
          </p>

        </div>

      </div>
      <!-- MODAL -->
        <div 
          v-if="eventoSeleccionado"
          class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          @click.self="cerrarModal"
        >
          <div class="bg-white rounded-lg w-full max-w-md shadow-lg overflow-hidden ">
            <h2 class="text-2xl font-bold p-5 text-black">
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
                  @click="desapuntar"
                  class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Desapuntarme
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
  </div>
</template>


<script setup>
  import { ref, onMounted } from "vue";

  const roluser = ref(null);
  const eventos = ref([])
  const eventoSeleccionado = ref(null)
  const usuarioLogeado = ref(false);
  const usuario = ref(null);

  async function cargarUsuario() {
    const loggedIn = localStorage.getItem("logged_in");

    if (loggedIn) {
      usuarioLogeado.value = true;

      try {
        const res = await fetch("api/perfil_api.php", {
          credentials: "include",
        });
        const data = await res.json();
        if (!data.error) {
          usuario.value = data;
        } else {
          // console.error(data.error);
          usuarioLogeado.value = false;
        }
        } catch (err) {
          usuarioLogeado.value = false;
        }
        } else {
          usuarioLogeado.value = false;
        }
    }

  async function rol() {
    const role = localStorage.getItem("role");
    roluser.value = role
  }

  async function mostrarEventos() {
    const id = localStorage.getItem("user_id")
    const res = await fetch(`/api/eventosUsuario_api.php?iduser=${id}`);
    const data = await res.json();
    eventos.value = data;
    console.log(data)
  }

  const abrirModal = (evento) => {  
    eventoSeleccionado.value = evento
  }

  const cerrarModal = () => {
    eventoSeleccionado.value = null
  }

  async function desapuntar(){
    const user_id = localStorage.getItem("user_id");
    const event_id = eventoSeleccionado.value.id;
    console.log(user_id);
    console.log(event_id)

    const res = await fetch(`/api/desapuntar_api.php?user_id=${user_id}&event_id=${event_id}`);
    mostrarEventos()
    cerrarModal()

  }

  async function cerrarSesion() {
    localStorage.clear("loggedin_in", "role", "username", "user_id");
    window.location.reload();
    window.location.href="/principal";

  }

  onMounted(mostrarEventos)
  onMounted(rol)
  onMounted(cargarUsuario);
    
</script>

<style>
.back {
  background: linear-gradient(
    to right,
    var(--color-blue-500),
    var(--color-purple-400)
  );
}

.fondo {
  background-image: url("../../img/aaa.png");
}
</style>
