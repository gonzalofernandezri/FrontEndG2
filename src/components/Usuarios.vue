<template>
  <div class="justify-center flex flex-col items-center min-h-screen space-y-4 "> 
    <div class="bg-gradient-to-r from-blue-400 to-purple-400 text-white size-100 font-black text-center rounded-lg border-black p-6">
      <h2 class="text-xl my-1">Registro de Usuario</h2><br>
      <form @submit.prevent="registrarUsuario">
        <div>
          <label>Usuario:</label><br>
          <input type="text" v-model="usuario" class="bg-transparent text-white placeholder-white border border-white rounded-md py-1 my-2 px-2 focus:outline-none focus:ring-2 focus:ring-white"  />
        </div>
        <div>
          <label>Email:</label><br>
          <input type="text" v-model="email" class="bg-transparent text-white placeholder-white border border-white rounded-md py-1 my-2 px-2 focus:outline-none focus:ring-2 focus:ring-white"  />
        </div>
        <div>
          <label>Contraseña:</label><br>
          <input type="password" v-model="contraseña" class="bg-transparent text-white placeholder-white border border-white rounded-md py-1 my-2 px-2 focus:outline-none focus:ring-2 focus:ring-white" />
        </div>
        <button class="my-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" type="submit">Registrar</button>
      </form>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      usuario: '',
      email: '',
      contraseña: ''
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

    async registrarUsuario() {

      if (!this.usuario) {
        this.mostrarAlerta('El nombre de usuario es obligatorio', 'error')
        return
      }
      if (!this.email) {
        this.mostrarAlerta('El email es obligatorio', 'error')
        return
      }
      if (!this.contraseña) {
        this.mostrarAlerta('La contraseña es obligatoria', 'error')
        return
      }



        const res = await fetch('/api/usuarios_api.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            usuario: this.usuario,
            email: this.email,
            contraseña: this.contraseña
          })
        })

        const data = await res.json()

        if (data.correcto) {
          this.mostrarAlerta(data.mensaje, 'success')


          this.usuario = ''
          this.email = ''
          this.contraseña = ''
        } 
    
          }
      }
  
    }



  
</script>


