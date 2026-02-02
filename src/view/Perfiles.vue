<template>
  <div class="flex items-center justify-center grow bg-gray-100 fondo sm:py-10">
    
    <div class="w-full max-w-6xl bg-gradient-to-r from-blue-400/70 to-purple-400/70 text-white size-100 font-black text-center rounded-lg border-black p-6 backdrop-blur-sm h-[600px]">


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
              class="mt-4 bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded shadow"
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
            <div class="md:col-span-2 flex flex-col h-[380px]">

              <h3 class="text-2xl font-bold mb-4 text-white">
                Mis eventos
              </h3>

        <ul
          v-if="eventos.length"
          class="bg-white/90 rounded-lg divide-y text-white-800 h-[335px] overflow-y-auto">
          <li
            v-for="evento in eventos"
            :key="evento.id"
            class="p-4 hover:bg-white-50">
            <div
              class="flex items-center gap-4 cursor-pointer"
              @click="abrirModal(evento)">
           
              <img
                v-if="evento.imagen"
                :src="`/gamefest_resources/events/${evento.imagen}`"
                alt="Imagen del evento"
                class="w-35 h-20 object-cover rounded-lg shrink-0"/>

              
              <div class="flex flex-col">
                <p class="font-semibold text-gray-700">
                  {{ evento.titulo }}
                </p>

                <p class="text-sm text-gray-700">
                  {{ evento.fecha }} · {{ evento.hora }} · {{ evento.tipo }}
                </p>
              </div>
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
              <div class="text-sm text-gray-700 grid grid-cols-2 gap-2">
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

import Swal from 'sweetalert2';

  import { ref, onMounted } from "vue";

  const roluser = ref(null);
  const eventos = ref([])
  const eventoSeleccionado = ref(null)
  const usuarioLogeado = ref(false);
  const usuario = ref(null);

  async function cargarUsuario() {
    try {
      const res = await fetch("api/perfil_api.php", {
        credentials: "include" // <--- envía cookie PHP
      });
      const data = await res.json();

      if (data.session && data.session.logged_in) {
        usuarioLogeado.value = true;
        usuario.value = data.session;
        roluser.value = data.session.role; // ya sabemos el rol

      } else {
        usuarioLogeado.value = false;
        usuario.value = null;
        roluser.value = null;
      }
    } catch (err) {
      console.error("Error cargando usuario:", err);
      usuarioLogeado.value = false;
      usuario.value = null;
      roluser.value = null;
    }
  }

  function rol() {
    if (usuario.value) {
      roluser.value = usuario.value.role;
    } else {
      roluser.value = null;
  }
}

  async function mostrarEventos() {
  try {
    const res = await fetch('/api/eventosUsuario_api.php', {
      credentials: 'include' // envía cookie PHP
    });
    const data = await res.json();
    console.log(data)
    eventos.value = data;
  } catch (err) {
    console.error('Error cargando eventos:', err);
  }
}

  const abrirModal = (evento) => {  
    eventoSeleccionado.value = evento
  }

  const cerrarModal = () => {
    eventoSeleccionado.value = null
  }

  async function desapuntar() {
    if (!eventoSeleccionado.value) return;

    const event_id = eventoSeleccionado.value.id;

    try {
      // Solo pasamos el event_id; el backend toma user_id de la sesión
      await fetch(`/api/desapuntar_api.php?event_id=${event_id}`, {
        method: 'POST', // más seguro que GET
        credentials: 'include' // envía la cookie de sesión PHP
      });

      // Actualizamos la lista de eventos y cerramos el modal
      await mostrarEventos();
      cerrarModal();

    } catch (err) {
      console.error("Error al desapuntar:", err);
    }
  }


  async function cerrarSesion() {
  try {
    await fetch("/api/logout.php", {
      method: "POST",       // destruimos la sesión con POST
      credentials: "include" // enviamos la cookie PHP
    });

    // Limpiamos variables reactivas locales (opcional)
    usuarioLogeado.value = false;
    usuario.value = null;
    roluser.value = null;
    eventos.value = [];

    // Redirigimos al usuario a la página principal
    window.location.href = "/principal";

  } catch (err) {
    console.error("Error cerrando sesión:", err);
  }
}

  onMounted(mostrarEventos)
  onMounted(rol)
  onMounted(cargarUsuario);

function mostrarAlerta(titulo, tipo) {
  return Swal.fire({
    title: titulo,
    icon: tipo,
    background: '#1e1e2f',
    color: '#f5f5f5',
    confirmButtonColor: '#4f46e5',
    confirmButtonText: 'Aceptar'
  });
}



  

    
</script>

<style>

.fondo {
  background-image: url("../../img/aaa.png");
}
</style>
