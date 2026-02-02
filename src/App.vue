<template>
  <div class="flex min-h-screen w-screen">
    <div class="grow flex flex-col">
      <header class="w-full px-5">
        <nav
          class="fixed top-5 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] border rounded-full p-5 flex flex-col md:flex-row items-center md:justify-between gap-2 md:gap-0"
        >
          <div class="flex flex-col sm:flex-row items-center gap-4 md:gap-5">
            <router-link to="/principal">
              <img
                src="../img/ElorrietaFest.png"
                alt="logo"
                class="h-14 w-auto bg-white/10  rounded-md ml-12"
              />

            </router-link>

            <h1 class="text-white text-2xl font-bold text-center md:text-left">
              ElorrietaFest
            </h1>
          </div>

          <ol class="flex flex-wrap justify-center md:flex gap-4 md:gap-6">
            <li>
              <router-link
                to="/juegos"
                :class="[
                  'text-white text-xl font-bold rounded-3xl px-4 py-2 transition-colors',
                  route.path === '/juegos'
                    ? 'shadow-inner lg:shadow-purple-700/50 shadow-blue-700/30 brightness-95 '
                    : 'hover:shadow-xl lg:shadow-purple-700/20 shadow-blue-700/30 cursor-pointer'
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
                    ? 'shadow-inner lg:shadow-purple-700/50 shadow-blue-700/30 brightness-95 '
                    : 'hover:shadow-xl lg:shadow-purple-700/20 shadow-blue-700/30 cursor-pointer'
                ]"
              >
                Eventos
              </router-link>
            </li>
            <li>
              <router-link
                to="/login"
                 :class="[
                  'text-white text-xl font-bold rounded-3xl px-4 py-2 transition-colors',
                  route.path === '/login'
                    ? 'shadow-inner shadow-purple-700/50 brightness-95 '
                    : 'hover:shadow-xl shadow-purple-700/30 cursor-pointer'
                ]"
                v-if="!usuarioLogeado"
              >
                Login
              </router-link>
              <router-link
                to="/perfiles"
                 :class="[
                  'text-white text-xl font-bold rounded-3xl px-4 py-2 transition-colors',
                  route.path === '/perfiles'
                    ? 'shadow-inner shadow-purple-700/50 brightness-95'
                    : 'hover:shadow-xl shadow-purple-700/30 cursor-pointer'
                ]"
                v-if="usuarioLogeado"
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

      <footer class="h-[100px] p-5 bg-gray-500 flex">
        <div>
          <img
            src="../img/ElorrietaFest.png"
            alt="ElorrietaFest  "
            class="h-14 w-auto"
          />
        </div>

        <div class="flex flex-col my-auto ms-auto">
          <h3 class="mb-2 m-auto text-white font-blod text-xl">Enlaces</h3>
          <div>
            <ol class="flex gap-6">
              <li>
                <router-link
                  to="/juegos"
                  class="text-white text-blod hover:text-purple-700"
                >
                  Juegos
                </router-link>
              </li>
              <li>
                <router-link
                  to="/eventos"
                  class="text-white text-blod hover:text-purple-700"
                >
                  Eventos
                </router-link>
              </li>
              <li v-if="!usuarioLogeado">
                <router-link
                  to="/login"
                  class="text-white text-blod hover:text-purple-700"
                  
                >
                  Login
                </router-link>
              </li>
              <li v-if="usuarioLogeado">
                <router-link
                  to="/perfiles"
                  class="text-white text-blod hover:text-purple-700"
                  
                >
                  Perfil
                </router-link>
              </li>
            </ol>
          </div>
        </div>
        <div class="w-[200px] ms-auto my-auto flex flex-col gap-4">
          <p class="m-auto">¡Siguenos!</p>
          <div class="m-auto flex flex-row gap-x-4">
            <!-- Facebook -->
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

            <!-- Instagram -->
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

            <!-- X / Twitter -->
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
import { ref, onMounted } from "vue";

const route = useRoute()
const usuarioLogeado = ref(false);

async function ocultarLogin() {
  try {
    const res = await fetch("/api/perfil_api.php", {
      credentials: "include" // envía la cookie de sesión PHP
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
