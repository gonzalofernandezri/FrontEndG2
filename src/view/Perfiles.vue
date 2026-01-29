<template>
  <div class="flex items-center justify-center grow bg-gray-100 fondo sm:py-10">
    <div class="w-100 h-70 bg-blue-400 text-white p-6 rounded-lg shadow-lg text-center space-y-12 back">
      <h4 class="text-3xl font-bold text-sm md:text-lg lg:text-1xl">
        ¡BIENVENIDO/A A ElorrietaFest!
      </h4>

      <div class="flex flex-col items-center gap-4">

        <div v-if="!usuarioLogeado" class="text-center">
          <span>No tienes cuenta?</span>
          <router-link
            to="/usuarios"
            class="ml-2 underline hover:text-blue-900"
          >Regístrate</router-link>
        </div>

        <div v-else class="text-center">
          <p>Hola, {{ usuario?.username }} ({{ usuario?.role }})</p>
          <p>Email: {{ usuario?.email }}</p>
          <button class="my-5 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"  @click="cerrarSesion();">Cerrar Sesion</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
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
    onMounted(cargarUsuario);

    return { usuarioLogeado, usuario };
  },
};







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
