<template>
    <div>
        <select v-model="tipo" @change="cargarEventos">
            <option value="">Todos</option>
            <option value="Presentación">Presentación</option>
            <option value="Charla">Charla</option>
            <option value="Taller">Taller</option>
            <option value="Mesa Redonda">Mesa Redonda</option>
            <option value="Exhibición">Exhibición</option>
            <option value="Torneo">Torneo</option>
            <option value="Networking">Networking</option>
            <option value="Competición">Competición</option>
        </select>

        <input 
          type="date" 
          class="border p-2 rounded w-full" 
          min="2025-02-13" 
          max="2025-02-15"
          v-model="fecha" 
          @change="cargarEventos">

        <label class="flex items-center gap-2 mt-2">
          <input type="checkbox" v-model="soloConPlazas" @change="cargarEventos">
          Solo eventos con plazas disponibles
        </label>

        <ul>
            <li v-for="evento in eventos" :key="evento.id">
              <strong>{{ evento.titulo }}</strong><br>
              Tipo: {{ evento.tipo }}<br>
              Fecha: {{ evento.fecha }}<br>
              Hora: {{ evento.hora }}<br>
              Plazas libres: {{ evento.plazasLibres }}<br>
              {{ evento.imagen }}<br>
              Descripción: {{ evento.descripcion }}<br>
          </li>
        </ul>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'

const eventos = ref([])
const tipo = ref('')
const fecha = ref('')
const soloConPlazas = ref(false)


async function cargarEventos() {
  const params = new URLSearchParams()

  if (tipo.value) {
    params.append('tipo', tipo.value)
  }

  if (fecha.value) {
    params.append('fecha', fecha.value)
  }

  if (soloConPlazas.value){
    params.append('plazas', 'true')
  } 

  const res = await fetch(`/api/eventos_api.php?${params.toString()}`)
  eventos.value = await res.json()
}

onMounted(cargarEventos)
</script>

