<template class="m-0">
    <div class="justify-center flex flex-col items-center min-h-screen space-y-4">
       <div>
            <input type="text" v-model="busqueda" placeholder="Buscar juego..." class="border p-2 rounded w-80">
       </div>
       <ul class="space-y-2 w-full max-w-xl">
        <li v-for="juego in juegos"  :key="juego.id" class="border p-2 rounded">
            {{ juego.titulo }} - {{ juego.genero }} - {{ juego.plataformas }}
        </li>

       </ul>
    </div>
</template>



<script setup>
import { ref, onMounted, computed } from 'vue'


const juegos = ref([])
const busqueda = ref('')

async function cargarJuegos() {
  const res = await fetch('/api/juegos_api.php')
  juegos.value = await res.json()

}

const juegosFiltrados = computed(() => {

    const query = busqueda.value.trim().toLowerCase()

    if(!query) return juegos.value
})
onMounted(cargarJuegos)


</script>




