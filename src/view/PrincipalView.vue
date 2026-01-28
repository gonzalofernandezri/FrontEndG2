<template>
  <div class="flex items-center justify-center grow bg-gray-100 fondo font-roboto">
    <div class="w-100 h-70 bg-blue-400 text-white p-6 rounded-lg shadow-lg text-center space-y-20 back">
      <h4 class="text-3xl font-bold">¡BIENVENIDO/A A ElorrietaFest!</h4>

      <div class="flex flex-row justify-center gap-4">
        <ol class="flex gap-6">
          <li>
            <router-link
              to="/juegos"
              class="bg-purple-300 text-white font-bold rounded p-3 
                     hover:bg-purple-400 hover:scale-105 transform transition duration-200 inline-block text-center font-roboto"
            >
              Juegos
            </router-link>
          </li>
          <li>
            <router-link
              to="/eventos"
              class="bg-purple-300 text-blue-600 font-bold rounded p-3 
                     hover:bg-purple-400 hover:scale-105 transform transition duration-200 inline-block text-center font-roboto"
            >
              Eventos
            </router-link>
          </li>
        </ol>
      </div>
      
    </div>
  </div>
</template>

<script setup>
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.back {
  background: linear-gradient(to right, var(--color-blue-500), var(--color-purple-400));
}

.fondo {
  background-image: url('../../img/aaa.png');
}

/* Tailwind necesita esta clase para Roboto si no está en config */
.font-roboto {
  font-family: 'Roboto', sans-serif;
}
</style>
