<template>
  <div class="flex items-center justify-center grow bg-gray-100 fondo">
    <div class="justify-center flex flex-col items-center space-y-4 "> 
      <div class="bg-gradient-to-r from-blue-400 to-purple-400 text-white size-100 font-black text-center rounded-lg border-black p-6">
        <h2 class="text-xl my-1">Inicio de Sesion</h2><br>
        <form @submit.prevent="">
          <div>
            <label>Usuario:</label><br>
            <input type="text" v-model="usuario" class="bg-transparent text-white placeholder-white border border-white rounded-md py-1 my-3 px-2 focus:outline-none focus:ring-2 focus:ring-white"  />
          </div>
          <div>
            <label>Contraseña:</label><br>
            <input type="password" v-model="contraseña" class="bg-transparent text-white placeholder-white border border-white rounded-md py-1 my-3 px-2 focus:outline-none focus:ring-2 focus:ring-white" />
          </div>
          <button class="my-5 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" @click="login" type="submit">Inicar Sesion</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref} from 'vue'
const usuario = ref('')
const contraseña = ref('')
async function login() {
  
  const params = new URLSearchParams()
  params.append('username', usuario.value)
  params.append('password', contraseña.value)


  const res = await fetch(`/api/login_api.php?${params.toString()}`, {
    method: 'GET',
    credentials: 'include' // <- importante para cookies de sesión
  })


  const data = await res.json()
  console.log(data)


  if (data.success) {
    console.log("Usuario logueado:", data.username)


    // Guardamos datos en localStorage
    localStorage.setItem('user_id', data.user_id)
    localStorage.setItem('username', data.username)
    localStorage.setItem('role', data.role)       // <-- guardamos el rol
    localStorage.setItem('logged_in', 'true')
     window.location.href="/perfiles";

  } else {
      alert(data.message)
  }
}






</script>