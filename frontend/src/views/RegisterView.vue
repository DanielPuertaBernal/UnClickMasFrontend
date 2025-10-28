<template>
  <div class="auth-container">
    <h2 class="text-center mb-4">Registro</h2>
    <form @submit.prevent="handleRegister">
      <div class="mb-3">
        <label class="form-label">Nombre</label>
        <input type="text" v-model="name" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Usuario</label>
        <input type="text" v-model="username" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="email" v-model="email" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Contraseña</label>
        <input type="password" v-model="password" class="form-control" required />
      </div>
      <button class="btn btn-primary w-100" type="submit">
        <i class="bi bi-person-plus me-2"></i> Crear cuenta
      </button>
    </form>

    <p class="mt-3 text-center">
      ¿Ya tienes cuenta?
      <router-link to="/">Inicia sesión</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Swal from "sweetalert2";
import { authService } from "../services/authService";
import { useRouter } from "vue-router";

const name = ref("");
const username = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();

async function handleRegister() {
  try {
    await authService.register({
      name: name.value,
      username: username.value,
      email: email.value,
      password: password.value,
    });
    Swal.fire("¡Éxito!", "Cuenta creada correctamente", "success");
    router.push("/");
  } catch (error) {
    Swal.fire("Error", error.response?.data?.message || "No se pudo registrar", "error");
  }
}
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 100px auto;
  background: #fff;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(200, 200, 200, 0.3);
}
button {
  background: #bde0fe;
  border: none;
}
button:hover {
  background: #a2d2ff;
}
</style>
