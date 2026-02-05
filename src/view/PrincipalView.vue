<template>
  <div
    class="
    flex items-center justify-center grow
    bg-gray-100 fondo
    px-4
    pt-36 pb-16
    min-h-screen
    "
  >
    <div
      class="w-full max-w-xl
      bg-gradient-to-r from-blue-400/50 to-purple-400/50
      text-white font-black text-center
      rounded-2xl
      border border-black/20
      backdrop-blur-sm
      p-6 md:p-10
      space-y-10 md:space-y-14"
    >
      <!-- TÍTULO -->
      <h4 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
        ¡BIENVENIDO/A A ElorrietaFest!
      </h4>

      <!-- CONTENIDO -->
      <div class="flex flex-col items-center gap-6">
        
        <div class="flex flex-col sm:flex-row w-full justify-center gap-4">
          <router-link
            to="/juegos"
            class="bg-purple-300 hover:bg-purple-500
            text-white font-bold px-6 py-3 rounded-lg transition
            w-full sm:w-auto text-center"
          >
            Juegos
          </router-link>

          <router-link
            to="/eventos"
            class="bg-purple-300 hover:bg-purple-500
            text-white font-bold px-6 py-3 rounded-lg transition
            w-full sm:w-auto text-center"
          >
            Eventos
          </router-link>
        </div>

        <div class="text-center text-sm sm:text-base">
          <span>No tienes cuenta?</span>
          <router-link
            to="/usuarios"
            class="ml-2 font-bold hover:text-blue-900 transition"
          >
            Regístrate
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>



<script setup>
</script>

<style>


.fondo {
  background-image: url("../../img/aaa.png");
}
</style>
