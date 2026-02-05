<template>
  <!-- Contenedor principal: ocupa toda la pantalla y usa flexbox -->
  <div class="flex min-h-screen w-screen">
    <!-- Contenedor que crece y organiza todo en columna -->
    <div class="grow flex flex-col">
      
      <!-- HEADER -->
      <header class="w-full px-5 z-50">
        <!-- Barra de navegación fija en la parte superior, centrada horizontalmente -->
        <nav
          class="fixed top-5 left-1/2 -translate-x-1/2 w-[calc(100%-35px)] shadow-xl shadow-purple-500/50 rounded-3xl px-6 py-4 flex flex-col md:flex-row items-center md:justify-between gap-4 z-50 bg-black/20 backdrop-blur-md transition-all duration-300"
        >
          <!-- Contenedor para logo + texto -->
          <div class="w-full md:w-auto flex justify-center md:justify-start">
            <!-- Enlace que redirige a la ruta /principal -->
            <router-link
              to="/principal"
              class="flex flex-col sm:flex-col md:flex-row items-center gap-2 md:gap-3"
            >
              <!-- Logo de la página -->
              <img
                src="../img/ElorrietaFest.png"
                alt="logo"
                class="h-20 md:h-20 w-auto drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"
              />

              <!-- Imagen del texto del título -->
              <img
                src="../img/ElorrietaTexto.png"
                alt="titulo"
                class="h-7 sm:h-8 md:h-10 w-auto opacity-95"
              />
            </router-link>
          </div>

          <!-- MENÚ DE NAVEGACIÓN -->
          <ol
            class="flex flex-col md:flex flex-row items-center justify-center w-full md:w-auto gap-2 md:gap-6 "
          >
            <!-- Item: Juegos -->
            <li>
              <router-link
                to="/juegos"
                :class="[  // Clases dinámicas según la ruta actual
                  'text-lg sm:text-xl font-bold rounded-3xl px-4 py-2 transition-colors',
                  route.path === '/juegos'  // Si estamos en /juegos
                    ? 'text-purple-700/70 shadow-inner lg:shadow-purple-700/50 shadow-blue-700/30'
                    : 'text-white hover:shadow-xl hover:text-purple-700 lg:shadow-purple-700/20 shadow-blue-700/30 cursor-pointer',
                ]"
              >
                Juegos
              </router-link>
            </li>

            <!-- Item: Eventos -->
            <li>
              <router-link
                to="/eventos"
                :class="[  // Clases dinámicas según la ruta actual
                  'text-lg sm:text-xl font-bold rounded-3xl px-4 py-2 transition-colors',
                  route.path === '/eventos' // Si estamos en /eventos
                    ? 'text-purple-700/70 shadow-inner lg:shadow-purple-700/50 shadow-blue-700/30'
                    : 'hover:text-purple-700 text-white hover:shadow-xl lg:shadow-purple-700/20 shadow-blue-700/30 cursor-pointer',
                ]"
              >
                Eventos
              </router-link>
            </li>

            <!-- Item: Login o Perfil según estado de usuario -->
            <li>
              <!-- Si no hay usuario logeado -->
              <router-link
                v-if="!usuarioLogeado"
                to="/login"
                :class="[  // Clases dinámicas
                  'text-lg sm:text-xl font-bold rounded-3xl px-4 py-2 transition-colors',
                  route.path === '/login'
                    ? 'text-purple-700/70 shadow-inner shadow-purple-700/50'
                    : 'hover:text-purple-700 text-white hover:shadow-xl shadow-purple-700/30 cursor-pointer',
                ]"
              >
                Login
              </router-link>

              <!-- Si hay usuario logeado -->
              <router-link
                v-else
                to="/perfiles"
                :class="[  // Clases dinámicas
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

      <!-- MAIN: área principal donde se renderizan las vistas de las rutas -->
      <main class="flex grow">
        <router-view /> <!-- Renderiza el componente de la ruta actual -->
      </main>

      <!-- FOOTER -->
      <footer
        class="w-full px-6 py-8 bg-gray-500 flex flex-col md:flex-row items-center md:items-center justify-between gap-6 text-center md:text-left"
      >
        <!-- Logo en el footer -->
        <div class="flex justify-center md:justify-start w-full md:w-auto">
          <img
            src="../img/ElorrietaFest.png"
            alt="ElorrietaFest"
            class="h-20 w-auto"
          />
        </div>

        <!-- Sección de enlaces -->
        <div class="flex flex-col items-center gap-3 w-full md:w-auto">
          <h3 class="text-white font-bold text-xl">Enlaces</h3>

          <ol class="flex flex-wrap justify-center md:justify-center gap-6">
            <!-- Link a Juegos -->
            <li>
              <router-link
                to="/juegos"
                class="text-white font-bold hover:text-purple-700 transition"
              >
                Juegos
              </router-link>
            </li>

            <!-- Link a Eventos -->
            <li>
              <router-link
                to="/eventos"
                class="text-white font-bold hover:text-purple-700 transition"
              >
                Eventos
              </router-link>
            </li>

            <!-- Link Login si no hay usuario logeado -->
            <li v-if="!usuarioLogeado">
              <router-link
                to="/login"
                class="text-white font-bold hover:text-purple-700 transition"
              >
                Login
              </router-link>
            </li>

            <!-- Link Perfil si hay usuario logeado -->
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

        <!-- Sección de redes sociales -->
        <div class="flex flex-col items-center gap-3 w-full md:w-auto">
          <p class="text-white font-semibold">¡Síguenos!</p>

          <div class="flex gap-5">
            <!-- Facebook -->
            <a href="https://www.facebook.com" target="_blank">
              <img
                src="../img/facebook.png"
                alt="Facebook"
                class="h-7 w-auto hover:brightness-90 transition duration-200"
              />
            </a>

            <!-- Instagram -->
            <a href="https://www.instagram.com" target="_blank">
              <img
                src="../img/instagram_10.png"
                alt="Instagram"
                class="h-7 w-auto hover:brightness-110 transition duration-200"
              />
            </a>

            <!-- X/Twitter -->
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
import { useRoute } from "vue-router";  // Importa para obtener la ruta actual
import { ref, onMounted } from "vue";  // Importa ref y onMounted para reactividad y ciclo de vida

const route = useRoute();          // Objeto reactivo que indica la ruta actual
const usuarioLogeado = ref(false); // Variable que indica si hay usuario logeado

// Función para comprobar sesión y decidir si mostrar Login o Perfil
async function ocultarLogin() {
  try {
    const res = await fetch("/api/perfil_api.php", {
      credentials: "include", // Envía cookie PHP para sesión
    });

    const data = await res.json(); // Parsear JSON de respuesta

    // Si hay sesión iniciada
    if (data.session && data.session.logged_in) {
      usuarioLogeado.value = true;
    } else {
      usuarioLogeado.value = false;
    }
  } catch (err) {
    console.error("Error comprobando sesión:", err);
    usuarioLogeado.value = false; // Por seguridad, considerar no logeado
  }
}

// Ejecutar al montar el componente
onMounted(ocultarLogin);
</script>

<style>
.fondo {
  background-size: cover;          /* Ajusta la imagen de fondo al contenedor */
  background-position: center;     /* Centra la imagen de fondo */
}

/* Fondo del nav */
nav {
  background: linear-gradient(
    to right,
    var(--color-blue-500),
    var(--color-purple-400)
  );
}

/* Fondo del footer */
footer {
  background: linear-gradient(
    to right,
    var(--color-blue-500),
    var(--color-purple-400)
  );
}
</style>
