<template>
  <div class="flex items-center justify-center grow bg-gray-100 fondo sm:py-10">
    <div
      class="w-100 h-70 bg-blue-400 text-white p-6 rounded-lg shadow-lg text-center space-y-20 back"
    >
      <h4 class="text-3xl font-bold text-sm md:text-lg lg:text-2xl">
        ¡BIENVENIDO/A A ElorrietaFest!
      </h4>
      <div class="flex flex-col justify-center gap-4 sm:flex-row">
        <router-link
          to="/juegos"
          class="bg-purple-300 rounded font-bold text-white p-3 hover:bg-purple-500 nav-link w-full sm:w-auto text-center"
        >
          Juegos
        </router-link>

        <router-link
          to="/eventos"
          class="bg-purple-300 text-white font-bold rounded p-3 hover:bg-purple-500 nav-link w-full sm:w-auto text-center"
        >
          Eventos
        </router-link>
        <div class="mt-2 text-center">
          <span>No tienes cuenta?</span>
          <router-link
            to="/usuarios"
            class="ml-2 underline hover:text-blue-900"
          >Regístrate
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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
