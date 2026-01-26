<template>
    <div class="flex flex-col items-center min-h-screen p-4">
       <div class="w-full flex justify-center mb-4 ">
            <input @input="juegosFiltrados" type="text" v-model="busqueda" placeholder="Buscar juego..." class="border p-2 rounded w-285">
       </div>
       <div class="w-full max-w-6xl">
       <ul class="grid grid-cols-3 gap-5 ">
            <li v-for="juego in juegos"  :key="juego.id" class="border p-2 rounded shadow hover:shadow-lg transition">
                <div>
                    <img :src="'../../gamefest_resources/games/'+ juego.imagen" :alt="'Imagen de ' + juego.titulo"  class="w-full h-40 object-cover rounded" @click="abrirModal('../../gamefest_resources/games/'+ juego.imagen)">
                </div>
                <h3 class="font-sans md:font-serif ">Titulo: {{ juego.titulo }}</h3>
                <p class="font-sans md:font-serif">Plataforma: {{ juego.plataformas }}  </p>   
                <p class="font-sans md:font-serif">Género: {{ juego.genero }} </p>
                <p class="font-sans md:font-serif">Descripcón: {{ juego.descripcion }}</p>    
            </li>
           
        </ul>
       </div>
      

    </div>
</template>



<script setup>
import { ref, onMounted } from 'vue'


const juegos = ref([])
const busqueda = ref('')
const modalVisible = ref(false)
const imagenSeleccionada = ref('')


async function cargarJuegos() {
  const res = await fetch('/api/juegos_api.php')
  juegos.value = await res.json()

}


async function juegosFiltrados() {

    const query = busqueda.value.trim()

    



    const res = await fetch(`/api/juegos_api.php?query=${encodeURIComponent(query)}`);
    const data = await res.json();
    
    juegos.value = data
  
}  


    

    // return juegos.value.filter(juego => {
    //     const inImagen = juego.imagen.toLowerCase().includes(query)
    //     const inTitulo = juego.titulo.toLowerCase().includes(query)
    //     const inGenero= juego.genero.toLowerCase().includes(query)
    //     const inPlataformas = juego.plataformas.toLowerCase().includes(query)
        
    //     const inDescripcion = juego.descripcion.toLowerCase().includes(query)

    //     return inImagen | inTitulo | inGenero | inPlataformas |  inDescripcion
    // })




function abrirModal() {
    imagenSeleccionada.value = imagen
    modalVisible = true
}

function cerrarModal() {
  modalVisible.value = false
}

onMounted(cargarJuegos)
</script>




