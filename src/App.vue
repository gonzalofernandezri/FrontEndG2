<template>
  <div class="flex min-h-screen w-screen">
    <div class="grow flex flex-col">
      <header class="w-full px-5">
        <nav
          class="fixed top-5 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] border rounded-full p-5 flex flex-col md:flex-row items-center md:justify-between gap-2  "
        >
      
          <div class="flex flex-row sm:flex-row items-center  md:gap-10 ">
            <router-link to="/principal">
              <img
                src="../img/ElorrietaFest2.png"
                alt="logo"
                class="h-14 w-auto"
              />
            </router-link>

            <h1 class="text-white text-2xl font-bold text-center md:text-left">
              ElorrietaFest
            </h1>
          </div>

          <ol
            class="flex flex-wrap justify-center md:flex gap-4 md:gap-6 "
          >
            <li>
              <router-link
                to="/juegos"
                :class="[
                  'text-white text-xl font-bold rounded-3xl px-4 py-2 transition-colors',
                  route.path === '/juegos'
                    ? 'shadow-inner shadow-black/40 brightness-95 '
                    : 'hover:text-purple-700 hover:shadow-xl cursor-pointer'
                ]"
              >
                Juegos
              </router-link>
            </li>
            <li>
              <router-link
                to="/eventos"
                :class="[
                  'text-white text-xl font-bold rounded-3xl px-4 py-2 transition-colors',
                  route.path === '/eventos'
                    ? 'shadow-inner shadow-black/40 brightness-95 '
                    : 'hover:text-purple-700 hover:shadow-xl cursor-pointer'
                ]"
              >
                Eventos
              </router-link>
            </li>
            <li>
              <router-link
                to="/login"
                class="text-white   text-xl font-bold   rounded p-3 hover:text-purple-800 nav-link"
              >
                Login
              </router-link>
            </li>
             <li>
              <router-link
                to="/perfil"
                class="text-white text-xl font-bold rounded px-4 py-2 hover:text-purple-700 transition-colors perfil"
              >
                Perfil
              </router-link>
            </li>
          </ol>
        </nav>
      </header>

      <main class="flex grow">
        <router-view />
      </main>

      <footer class="h-[125px] p-5 bg-gray-500 flex">
        <div>
          <img
            src="../img/ElorrietaFest.png"
            alt="ElorrietaFest  "
            class="h-14 w-auto"
          />
        </div>

        <div class="flex flex-col my-auto ms-auto">
          <h3 class="mb-2 m-auto text-white font-blod text-xl">Enlaces</h3>
          <div class="flex flex-row ms-auto my-auto">
            <ol class="flex gap-6">
              <li>
                <router-link to="/juegos" class="text-white text-blod hover:text-purple-700"> Juegos </router-link>
              </li>
              <li>
                <router-link to="/eventos" class="text-white text-blod hover:text-purple-700"> Eventos </router-link>
              </li>
              <li>
                <router-link to="/login" class="text-white text-blod hover:text-purple-700"> Login </router-link>
              </li>
            </ol>
          </div>
        </div>
        <div class=" ms-auto my-auto flex flex-col gap-4">
          <p class="m-auto">¡Siguenos!</p>
          <div class="m-auto flex flex-row gap-x-4">
           
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="../img/facebook.png"
                alt="Facebook"
                class="h-[30px] w-auto hover:brightness-90 transition duration-200"
              />
            </a>

         
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="../img/instagram_10.png"
                alt="Instagram"
                class="h-[30px] w-auto hover:brightness-1000 transition duration-200"
              />
            </a>

            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <img
                src="../img/iconX.png"
                alt="X (Twitter)"
                class="h-[30px] w-auto hover:brightness-300 transition duration-200"
              />
            </a>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'


const route = useRoute()
</script>

<style>


.fondo {
  background-size: cover;
  background-position: center;
}

.perfil {
  display: none;
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
