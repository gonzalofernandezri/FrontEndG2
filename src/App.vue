<template>
  <div>
    <h1>User Events</h1>

    <!-- Aquí insertamos el HTML que devuelve PHP -->
    <div v-html="userEventsHtml"></div>

    <!-- Mensaje si no hay datos -->
    <p v-if="userEventsHtml === ''">Cargando datos...</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const userEventsHtml = ref("")

    onMounted(async () => {
      try {
        // 🔹 fetch usando proxy configurado en vite.config.js
        const res = await fetch('/api/conexion.php')
        const html = await res.text() // 🔹 leer como HTML
        userEventsHtml.value = html
      } catch (err) {
        console.error('Error cargando los datos:', err)
      }
    })

    return { userEventsHtml }
  },
}
</script>
