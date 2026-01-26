<template>
  <div class="fondo">
    <div class="min-h-screen flex flex-col w-screen">


      <header class="w-full px-[20px]">
        <nav
          class="fixed top-5 left-1/2 -translate-x-1/2
                 w-[calc(100%-40px)]
                 border rounded-full p-5
                 flex justify-end px-60 z-50"
        >
          <router-link to="/principal">
            <img src="../img/videojuego.png" alt="videojuego" class="h-14 w-auto">
          </router-link>


          <h1 class="text-white ms-5 my-auto text-3xl font-bold">
            ElorrietaFest
          </h1>


          <ol class="flex gap-6 ms-auto my-auto">
            <li>
              <router-link
                to="/juegos"
                class="bg-orange-300 rounded p-3 hover:text-orange-800 nav-link"
              >
                Juegos
              </router-link>
            </li>
            <li>
              <router-link
                to="/eventos"
                class="bg-orange-300 rounded p-3 hover:text-orange-800 nav-link"
              >
                Eventos
              </router-link>
            </li>
          </ol>
        </nav>
      </header>


 
      <main class="flex-grow pt-36">
        <router-view />
      </main>


     
      <footer class="h-[100px] p-5 flex ">
        <div>
          <img src="../img/videojuego.png" alt="videojuego" class="h-14 w-auto">
        </div>


        <div class="flex flex-col my-auto ms-auto">
          <h3 class="mb-2 m-auto text-white">Enlaces</h3>
          <ol class="flex gap-6 foter">
            <li>
              <router-link to="/juegos">Juegos</router-link>
            </li>
            <li>
              <router-link to="/eventos">Eventos</router-link>
            </li>
          </ol>
        </div>


        <div class="w-[200px] ms-auto my-auto flex flex-col gap-4">
          <p class="m-auto">¡Síguenos!</p>
          <div class="m-auto flex justify-around">
            <img src="../img/facebook.png" class="h-[30px]">
            <img src="../img/instagram_10.png" class="h-[30px]">
            <img src="../img/iconX.png" class="h-[30px]">
          </div>
        </div>
      </footer>


    </div>
  </div>
</template>


<style>
.fondo {
  background-size: cover;
  background-position: center;
}


nav {
  background: linear-gradient(to right, var(--color-blue-500), var(--color-purple-400));
}


footer {
  background: linear-gradient(to right, var(--color-blue-500), var(--color-purple-400));
}

.foter {
  color: white;
  font-weight: bold ;
}
</style>
