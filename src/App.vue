<template>
  <div class="flex min-h-screen w-screen">
    <div class="grow flex flex-col">
      <header class="w-full px-5 z-50">
        <nav
          class="fixed top-5 left-1/2 -translate-x-1/2 w-[calc(100%-35px)] shadow-xl shadow-purple-500/50 rounded-3xl px-6 py-4 flex flex-col md:flex-row items-center md:justify-between gap-4 z-50 bg-black/20 backdrop-blur-md transition-all duration-300"
        >
          <!-- LOGO + TEXTO -->
          <div class="w-full md:w-auto flex justify-center md:justify-start">
            <router-link
              to="/principal"
              class="flex flex-col sm:flex-col md:flex-row items-center gap-2 md:gap-3"
            >
              <!-- Logo -->
              <img
                src="../img/ElorrietaFest.png"
                alt="logo"
                class="h-20 md:h-20 w-auto drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"
              />

              <!-- Texto título -->
              <img
                src="../img/ElorrietaTexto.png"
                alt="titulo"
                class="h-7 sm:h-8 md:h-10 w-auto opacity-95"
              />
            </router-link>
          </div>

          <!-- MENU -->
          <ol
            class="flex flex-col md:flex flex-row items-center justify-center w-full md:w-auto gap-2 md:gap-6 "
          >
            <li>
              <router-link
                to="/juegos"
                :class="[
                  'text-lg sm:text-xl font-bold rounded-3xl px-4 py-2 transition-colors',
                  route.path === '/juegos'
                    ? 'text-purple-700/70 shadow-inner lg:shadow-purple-700/50 shadow-blue-700/30'
                    : 'text-white hover:shadow-xl hover:text-purple-700 lg:shadow-purple-700/20 shadow-blue-700/30 cursor-pointer',
                ]"
              >
                Juegos
              </router-link>
            </li>

            <li>
              <router-link
                to="/eventos"
                :class="[
                  'text-lg sm:text-xl font-bold rounded-3xl px-4 py-2 transition-colors',
                  route.path === '/eventos'
                    ? 'text-purple-700/70 shadow-inner lg:shadow-purple-700/50 shadow-blue-700/30'
                    : 'hover:text-purple-700 text-white hover:shadow-xl lg:shadow-purple-700/20 shadow-blue-700/30 cursor-pointer',
                ]"
              >
                Eventos
              </router-link>
            </li>

            <li>
              <router-link
                v-if="!usuarioLogeado"
                to="/login"
                :class="[
                  'text-lg sm:text-xl font-bold rounded-3xl px-4 py-2 transition-colors',
                  route.path === '/login'
                    ? 'text-purple-700/70 shadow-inner shadow-purple-700/50'
                    : 'hover:text-purple-700 text-white hover:shadow-xl shadow-purple-700/30 cursor-pointer',
                ]"
              >
                Login
              </router-link>

              <router-link
                v-else
                to="/perfiles"
                :class="[
                  'text-lg sm:text-xl font-bold rounded-3xl px-4 py-2 transition-colors',
                  route.path === '/perfiles'
                    ? 'text-purple-700/70 shadow-inner shadow-purple-700/50 brightness-95'
                    : 'hover:text-purple-700 text-white hover:shadow-xl shadow-purple-700/30 cursor-pointer',
                ]"
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

      <footer
        class="w-full px-6 py-8 bg-gray-500 flex flex-col md:flex-row items-center md:items-center justify-between gap-6 text-center md:text-left"
      >
        <!-- LOGO -->
        <div class="flex justify-center md:justify-start w-full md:w-auto">
          <img
            src="../img/ElorrietaFest.png"
            alt="ElorrietaFest"
            class="h-20 w-auto"
          />
        </div>

        <!-- ENLACES -->
        <div class="flex flex-col items-center gap-3 w-full md:w-auto">
          <h3 class="text-white font-bold text-xl">Enlaces</h3>

          <ol class="flex flex-wrap justify-center md:justify-center gap-6">
            <li>
              <router-link
                to="/juegos"
                class="text-white font-bold hover:text-purple-700 transition"
              >
                Juegos
              </router-link>
            </li>

            <li>
              <router-link
                to="/eventos"
                class="text-white font-bold hover:text-purple-700 transition"
              >
                Eventos
              </router-link>
            </li>

            <li v-if="!usuarioLogeado">
              <router-link
                to="/login"
                class="text-white font-bold hover:text-purple-700 transition"
              >
                Login
              </router-link>
            </li>

            <li v-if="usuarioLogeado">
              <router-link
                to="/perfiles"
                class="text-white font-bold hover:text-purple-700 transition"
              >
                Perfil
              </router-link>
            </li>
          </ol>
        </div>

        <!-- REDES -->
        <div class="flex flex-col items-center gap-3 w-full md:w-auto">
          <p class="text-white font-semibold">¡Síguenos!</p>

          <div class="flex gap-5">
            <a href="https://www.facebook.com" target="_blank">
              <img
                src="../img/facebook.png"
                alt="Facebook"
                class="h-7 w-auto hover:brightness-90 transition duration-200"
              />
            </a>

            <a href="https://www.instagram.com" target="_blank">
              <img
                src="../img/instagram_10.png"
                alt="Instagram"
                class="h-7 w-auto hover:brightness-110 transition duration-200"
              />
            </a>

            <a href="https://x.com" target="_blank">
              <img
                src="../img/iconX.png"
                alt="X"
                class="h-7 w-auto hover:brightness-125 transition duration-200"
              />
            </a>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const usuarioLogeado = ref(false);

async function ocultarLogin() {
  try {
    const res = await fetch("/api/perfil_api.php", {
      credentials: "include", // envía la cookie de sesión PHP
    });

    const data = await res.json();

    if (data.session && data.session.logged_in) {
      usuarioLogeado.value = true;
    } else {
      usuarioLogeado.value = false;
    }
  } catch (err) {
    console.error("Error comprobando sesión:", err);
    usuarioLogeado.value = false;
  }
}

onMounted(ocultarLogin);
</script>

<style>
.fondo {
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
