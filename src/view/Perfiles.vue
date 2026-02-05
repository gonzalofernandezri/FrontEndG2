<template>
  <div class="flex items-center justify-center grow fondo py-10">
    
    <div
      class="w-full max-w-6xl bg-gradient-to-r from-blue-500/80 to-purple-500/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 text-white lg:mt-30 md:mt-30 mt-70">
      
      <h4 class="text-3xl md:text-4xl font-extrabold text-center mb-10 tracking-wide">
        ¡BIENVENIDO/A A ElorrietaFest!
      </h4>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">

        <div class="md:col-span-1 flex flex-col items-center gap-4">

          <div v-if="!usuarioLogeado" class="text-center">
            <span>¿No tienes cuenta?</span>
            <router-link
              to="/usuarios"
              class="ml-2 underline hover:text-blue-900">
              Regístrate
            </router-link>
          </div>

          <div v-else class="flex flex-col items-center gap-3 text-center">

            <div class="w-20 h-20 rounded-full bg-white/30 flex items-center justify-center text-3xl font-bold">
              {{ usuario?.username.charAt(0).toUpperCase() }}
            </div>

            <p class="text-lg font-semibold">
              {{ usuario?.username }}
            </p>

            <span class="text-xs bg-black/30 px-3 py-1 rounded-full">
              {{ usuario?.role }}
            </span>

            <p class="text-sm opacity-80">
              {{ usuario?.email }}
            </p>

            <button
              class="mt-4 bg-white text-gray-800 font-semibold py-2 px-4 rounded-lg
                     hover:bg-gray-200 transition"
              @click="cerrarSesion">
              Cerrar sesión
            </button>

            <router-link
              v-if="roluser === 'ADMIN'"
              to="/crearEvento"
              class="mt-2 bg-purple-600 text-white font-semibold rounded-lg px-4 py-2
                     hover:bg-purple-700 transition text-center">
              Crear eventos
            </router-link>
          </div>
        </div>

        <div class="md:col-span-2 flex flex-col">

          <h3 class="text-2xl font-bold mb-4">
            Mis eventos
          </h3>

          <ul
            v-if="eventos.length"
            class="bg-white/20 rounded-xl divide-y divide-white/20
                   h-[350px] overflow-y-auto">

            <li
              v-for="evento in eventos"
              :key="evento.id"
              class="p-4 transition hover:bg-white/20 cursor-pointer"
              @click="abrirModal(evento)">

              <div class="flex items-center gap-4">

                <img
                  v-if="evento.imagen"
                  :src="`/gamefest_resources/events/${evento.imagen}`"
                  class="w-28 h-20 object-cover rounded-lg shadow-md"/>

                <div class="flex flex-col gap-1">
                  <p class="font-semibold text-white text-lg">
                    {{ evento.titulo }}
                  </p>

                  <span class="text-sm bg-black/30 w-fit px-2 py-1 rounded">
                    {{ evento.fecha }} · {{ evento.hora }}
                  </span>

                  <span class="text-xs opacity-80">
                    {{ evento.tipo }}
                  </span>
                </div>
              </div>
            </li>
          </ul>

          <p v-else class="mt-4 opacity-80">
            No estás apuntado a ningún evento todavía.
          </p>
        </div>
      </div>

      <div
        v-if="eventoSeleccionado"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        @click.self="cerrarModal">

        <div class="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">

          <h2 class="text-2xl font-bold p-5 text-black">
            {{ eventoSeleccionado.titulo }}
          </h2>

          <div class="p-5">
            <img
              v-if="eventoSeleccionado.imagen"
              :src="`/gamefest_resources/events/${eventoSeleccionado.imagen}`"
              class="w-full h-48 object-cover rounded-lg"/>
          </div>

          <div class="p-5 flex flex-col gap-4">
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
                class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                Desapuntarme
              </button>

              <button
                @click="cerrarModal"
                class="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition">
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
import Swal from 'sweetalert2'; // Librería para alertas estéticas
import { ref, onMounted } from "vue"; // Funciones reactivas y de ciclo de vida

// --- Variables de Estado ---
const roluser = ref(null); // Almacena el rol del usuario (ADMIN/USER)
const eventos = ref([]) // Lista de eventos cargados desde el servidor
const eventoSeleccionado = ref(null) // Evento activo en el modal
const usuarioLogeado = ref(false); // Flag de estado de sesión
const usuario = ref(null); // Objeto completo con datos del usuario

// Función para recuperar datos del perfil del usuario logueado en PHP
async function cargarUsuario() {
  try {
    const res = await fetch("api/perfil_api.php", {
      credentials: "include" // Importante: Envía la cookie de sesión PHP
    });
    const data = await res.json();

    if (data.session && data.session.logged_in) {
      usuarioLogeado.value = true;
      usuario.value = data.session;
      roluser.value = data.session.role;
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

// Función auxiliar para asignar el rol (complementaria a cargarUsuario)
function rol() {
  if (usuario.value) {
    roluser.value = usuario.value.role;
  } else {
    roluser.value = null;
  }
}

// Carga la lista de eventos en los que el usuario está inscrito
async function mostrarEventos() {
  try {
    const res = await fetch('/api/eventosUsuario_api.php', {
      credentials: 'include' // Mantiene la persistencia de la sesión
    });
    const data = await res.json();
    console.log(data)
    eventos.value = data;
  } catch (err) {
    console.error('Error cargando eventos:', err);
  }
}

// Manejo visual del Modal
const abrirModal = (evento) => {  
  eventoSeleccionado.value = evento
}

const cerrarModal = () => {
  eventoSeleccionado.value = null
}

// Función para desvincular al usuario del evento seleccionado
async function desapuntar() {
  if (!eventoSeleccionado.value) return;

  const event_id = eventoSeleccionado.value.id;

  try {
    // Petición POST para eliminar la relación usuario-evento en la DB
    await fetch(`/api/desapuntar_api.php?event_id=${event_id}`, {
      method: 'POST',
      credentials: 'include'
    });

    // Refresca la lista visual tras la eliminación
    await mostrarEventos();
    cerrarModal();

  } catch (err) {
    console.error("Error al desapuntar:", err);
  }
}

// Finaliza la sesión en el servidor y limpia el estado local
async function cerrarSesion() {
  try {
    await fetch("/api/logout.php", {
      method: "POST",
      credentials: "include"
    });

    // Reseteo de variables reactivas
    usuarioLogeado.value = false;
    usuario.value = null;
    roluser.value = null;
    eventos.value = [];

    // Redirección forzada para limpiar el estado de la aplicación
    window.location.href = "/principal";

  } catch (err) {
    mostrarAlerta("Error cerrando sesión:", err);
  }
}

// Ciclo de vida: Se ejecuta al cargar el componente
onMounted(mostrarEventos)
onMounted(rol)
onMounted(cargarUsuario);

//  para mostrar alertas estilizadas con SweetAlert2
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
