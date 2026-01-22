<template>
  <div>
    <h1>Mi Página Web</h1>

    <nav class="fixed top-0 right p-4 shadow-md bg-white">
      <ol class="flex gap-6">
        <li><router-link to="/juegos" class="text-blue-600 hoever:text-blue-800">Juegos</router-link></li> 
        <li><router-link to="/eventos" class="text-blue-600 hoever:text-blue-800">Eventos</router-link></li>
        <li><router-link to="/usuarios" class="text-blue-600 hoever:text-blue-800">Usuarios</router-link></li>


      </ol>
    </nav>

    <router-view />
  </div>
</template>

<style>

</style>
