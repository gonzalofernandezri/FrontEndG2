<template>
    <div>
        <select v-model="genero" @change="cargarJuegos">
            <option value="">Todos los generos</option>
            <option value="Sandbox">Sandbox</option>
            <option value="Battle Royale">Battle Royal</option>
            <option value="MOBA">MOBA</option>
            <option value="Shooter táctico">Shooter táctico</option>
            <option value="Shooter competitivo">Shooter competitivo</option>
            <option value="Shooter">Shooter</option>
            <option value="Acción / Looter Shooter">Acción / Looter Shooter</option>
            <option value="RPG de acción">RPG de acción</option>    
        </select>

        <select v-model="plataforma" @change="cargarJuegos">
            <option value="">Todas las plataformas</option>
            <option value='PC'>Ordenador</option>
            <option value="Consolas">Consola</option>
            <option value="Móviles">Móvil</option>    
        </select>

        <ul>
            <li v-for="juego in juegos" :key="juego.id">
            {{ juego.titulo }} — {{ juego.genero }} - {{ juego.plataformas }} - {{ juego.imagen }} - {{ juego.descripcion }}
            </li>
        </ul>
    </div>
</template>



<script setup>
import { ref, onMounted } from 'vue'


const juegos = ref([])
const genero = ref('')
const plataforma = ref('')

async function cargarJuegos() {
  const params = new URLSearchParams()


  if (genero.value) {
    params.append('genero', genero.value)
  }

    if (plataforma.value) {
    params.append('plataformas', plataforma.value)
  }

  const res = await fetch(`/api/juegos_api.php?${params.toString()}`)
  juegos.value = await res.json()
}


onMounted(cargarJuegos)
</script>




