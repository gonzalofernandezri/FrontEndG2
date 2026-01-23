<template>
    <div class="flex flex-col items-center min-h-screen p-4">
       <div class="w-full flex justify-center mb-4">
            <input type="text" v-model="busqueda" placeholder="Buscar juego..." class="border p-2 rounded w-80">
       </div>
       <div class="w-full max-w-6xl">
       <ul class="grid grid-cols-3 gap-5 ">
            <li v-for="juego in juegosFiltrados"  :key="juego.id" class="border p-2 rounded shadow hover:shadow-lg transition">
                <div>
                    <img src="../.." alt="`Imagen de ${juego.titulo}`" class="w-full h-40 object-cover rounded">
                </div>
                <h3 class="font-sans md:font-serif ">Titulo: {{ juego.titulo }}</h3>
                <p class="font-sans md:font-serif">Plataforma: {{ juego.plataformas }}  </p>   
                <P class="font-sans md:font-serif">Género: {{ juego.genero }} </P>
                <p class="font-sans md:font-serif">Descripcón: {{ juego.descripcion }}</p>    
            </li>
           
        </ul>
       </div>
      
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

    return juegos.value.filter(juego => {
        const inImagen = juego.imagen.toLowerCase().includes(query)
        const inTitulo = juego.titulo.toLowerCase().includes(query)
        const inGenero= juego.genero.toLowerCase().includes(query)
        const inPlataformas = juego.plataformas.toLowerCase().includes(query)
        
        const inDescripcion = juego.descripcion.toLowerCase().includes(query)

        return inImagen | inTitulo | inGenero | inPlataformas |  inDescripcion
    })
})
onMounted(cargarJuegos)


</script>




