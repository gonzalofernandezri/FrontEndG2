<template>
  <div class="flex min-h-screen w-screen">
    <div class="grow flex flex-col">
      <header class="w-full px-[20px]">
        <nav
          class="fixed top-5 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] border rounded-full p-5 flex justify-end px-6 px-60"
        >
          <router-link to="/principal">
            <img
              src="../img/ElorrietaFest.png"
              alt="videojuego"
              class="h-14 w-auto"
            />
          </router-link>

          <h1 class="text-white flex flex-col ms-5 my-auto text-3xl font-bold">
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

      <main class="flex grow">
        <router-view />
      </main>

      <footer class="h-[100px] p-5 bg-gray-500 flex">
        <div>
          <img
            src="../img/ElorrietaFest.png"
            alt="ElorrietaFest  "
            class="h-14 w-auto"
          />
        </div>

        <div class="flex flex-col my-auto ms-auto">
          <h3 class="mb-2 m-auto">Enlaces</h3>
          <div>
            <ol class="flex gap-6">
              <li>
                <router-link to="/juegos"> Juegos </router-link>
              </li>
              <li>
                <router-link to="/eventos"> Eventos </router-link>
              </li>
            </ol>
          </div>
        </div>
        <div class="w-[200px] ms-auto my-auto flex flex-col gap-4">
          <p class="m-auto">¡Siguenos!</p>
          <div class="m-auto flex flex-row gap-x-4">
            <img
              src="../img/facebook.png"
              alt="facebook"
              class="h-[30px] w-auto hover:bg-blue-700"
            />
            <img
              src="../img/instagram_10.png"
              alt="instagram"
              class="h-[30px] w-auto hover:bg-blue-700"
            />
            <img
              src="../img/iconX.png"
              alt="iconX"
              class="h-[30px] w-auto hover:bg-blue-700"
            />
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup></script>

<style>
.fondo {
  /* background-image: url('../img/azulFondo.png'); */
  background-size: cover;
  background-position: center;
}
nav {
  background: linear-gradient(
    to right,
    var(--color-blue-500),
    var(--color-purple-400)
  );
}

footer {
  background: linear-gradient(
    to right,
    var(--color-blue-500),
    var(--color-purple-400)
  );
}
</style>
