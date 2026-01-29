<template>
  <div class="flex items-center justify-center grow bg-gray-100 fondo">
    <div class="justify-center flex flex-col items-center space-y-4 pt-30"> 
      <div class="bg-gradient-to-r from-blue-400 to-purple-400 text-white size-160 font-black text-center rounded-lg border-black p-6">
        
        <h2 class="text-xl my-1">Crear Evento</h2><br>

        <form @submit.prevent="registrarUsuario">
          
          <div>
            <label>Título:</label><br>
            <input
              type="text"
              v-model="titulo"
              class="bg-transparent text-white placeholder-white border border-white rounded-md py-1 my-2 px-2 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div>
            <label>Tipo:</label><br>
            <input
              type="text"
              v-model="tipo"
              class="bg-transparent text-white placeholder-white border border-white rounded-md py-1 my-2 px-2 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
    <div class="flex flex-row justify-center">
          <div>
            <label>Fecha:</label><br>
            <input
              type="date"
              v-model="fecha"
              class="bg-transparent text-white border border-white rounded-md py-1 my-2 px-2 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          

          <div>
            <label>Hora:</label><br>
            <input
              type="time"
              v-model="hora"
              class="bg-transparent text-white border border-white rounded-md py-1 my-2 px-2 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div></div>

          <div>
            <label>Plazas:</label><br>
            <input
              type="number"
              v-model="plazas"
              min="1"
              class="bg-transparent text-white placeholder-white border border-white rounded-md py-1 my-2 px-2 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div>
            <label>Imagen (URL):</label><br>
            <input
              type="text"
              v-model="imagen"
              class="bg-transparent text-white placeholder-white border border-white rounded-md py-1 my-2 px-2 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div>
            <label>Descripción:</label><br>
            <textarea
              v-model="descripcion"
              rows="3"
              class="bg-transparent text-white placeholder-white border border-white rounded-md py-1 my-2 px-2 focus:outline-none focus:ring-2 focus:ring-white w-full"
            ></textarea>
          </div>

          <button
            type="submit"
            @click="crearEvento"
            class="my-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            Crear Evento
          </button>

        </form>
      </div>
    </div>
  </div>
</template>


<script>

import Swal from 'sweetalert2'

export default {
  data() {
    return {
      titulo: '',
      tipo: '',
      fecha: '',
      hora: '',
      plazas: '',
      imagen: '',
      descripcion: '',
      createdby: 1
    }
  },

  methods: {
    mostrarAlerta(titulo, tipo = 'info') {
      Swal.fire({
        title: titulo,
        icon: tipo, // success, error, warning, info
        background: '#1e1e2f',
        color: '#f5f5f5',
        confirmButtonColor: '#4f46e5'
      })
    },

    async crearEvento() {
      // 🔍 Validaciones
      if (!this.titulo) {
        this.mostrarAlerta('El título es obligatorio', 'error')
        return
      }

      if (!this.tipo) {
        this.mostrarAlerta('El tipo es obligatorio', 'error')
        return
      }

      if (!this.fecha) {
        this.mostrarAlerta('La fecha es obligatoria', 'error')
        return
      }

      if (!this.hora) {
        this.mostrarAlerta('La hora es obligatoria', 'error')
        return
      }

      if (!this.plazas || this.plazas <= 0) {
        this.mostrarAlerta('Las plazas deben ser mayores que 0', 'error')
        return
      } 

     
        const res = await fetch('/api/crearEvento_api.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            titulo: this.titulo,
            tipo: this.tipo,
            fecha: this.fecha,
            hora: this.hora,
            plazas: this.plazas,
            imagen: this.imagen,
            descripcion: this.descripcion,
            createdby: this.createdby
            
              
          })
           
        })

   
        const data = await res;
        console.log(data);

      
      }
    }
  }




  
</script>


