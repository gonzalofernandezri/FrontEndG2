<script setup>
import { ref, onMounted } from 'vue'

const eventos = ref([])
const tipo = ref('')

async function cargarEventos() {
  const params = new URLSearchParams()

  if (tipo.value) {
    params.append('tipo', tipo.value)
  }

  const res = await fetch(`/api/eventos_api.php?${params.toString()}`)
  eventos.value = await res.json()
}

onMounted(cargarEventos)
</script>

<template>
    <div>
        <select v-model="tipo" @change="cargarEventos">
            <option value="">Todos</option>
            <option value="Presentación">Presentación</option>
            <option value="Charla">Charla</option>
        </select>

        <ul>
            <li v-for="evento in eventos" :key="evento.id">
            {{ evento.titulo }} — {{ evento.tipo }}
            </li>
        </ul>
    </div>
</template>
