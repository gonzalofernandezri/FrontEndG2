<template>
  <div>
    <h2>Registro de Usuario</h2>
    <form @submit.prevent="registrarUsuario">
      <div>
        <label>Usuario:</label>
        <input type="text" v-model="usuario" />
      </div>
      <div>
        <label>Email:</label>
        <input type="text" v-model="email" />
      </div>
      <div>
        <label>Contraseña:</label>
        <input type="password" v-model="contraseña" />
      </div>
      <button type="submit">Registrar</button>

      <ul v-if="errores.length" style="color:red">
        <li v-for="(err, i) in errores" :key="i">{{ err }}</li>
      </ul>
      <p v-if="correcto" style="color:green">{{ correcto }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usuario: '',
      email: '',
      contraseña: '',
      errores: [],
      correcto: ''
    }
  },
  methods: {
    async  registrarUsuario() {
      this.errores = []
      this.correcto = ''

      if (!this.usuario) this.errores.push('El nombre de usuario es obligatorio')
      if (!this.email) this.errores.push('El email es obligatorio')
      if (!this.contraseña) this.errores.push('La contraseña es obligatoria')
      if (this.errores.length) return

      try {
        
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
          this.correcto = data.mensaje
          this.usuario = ''
          this.email = ''
          this.contraseña = ''
        } else if (data.errores) {
          this.errores = data.errores
        }

      } catch (err) {
      }
    }
  }
}
</script>



