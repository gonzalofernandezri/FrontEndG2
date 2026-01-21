<template>
 <header class="w-full  p-4 flex flex-col md:flex-row justify-between items-center">

     <div class="w-full ">
      <nav class="bg-purple-300  w-full p-4 flex flex-col md:flex-row justify-between items-center">
        <ol class="flex gap-6 ">
          <li><router-link to="/juegos" class="text-blue-500 hover:text-blue-800 ">Juegos</router-link></li> 
          <li><router-link to="/eventos" class="text-blue-500 hover:text-blue-800">Eventos</router-link></li>
        </ol>
      </nav>

    <router-view />
    </div>
  </header>
</template>

<script>



</script>

<style>

</style>
