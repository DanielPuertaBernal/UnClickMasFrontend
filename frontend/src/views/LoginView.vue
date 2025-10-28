<template>
  <div class="auth-container">
    <h2 class="text-center mb-4">Iniciar Sesión</h2>
    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label class="form-label">Usuario o Email</label>
        <input type="text" v-model="identifier" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Contraseña</label>
        <input type="password" v-model="password" class="form-control" required />
      </div>
      <button class="btn btn-success w-100" type="submit">
        <i class="bi bi-box-arrow-in-right me-2"></i> Entrar
      </button>
    </form>

    <p class="mt-3 text-center">
      ¿No tienes cuenta?
      <router-link to="/register">Regístrate aquí</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Swal from "sweetalert2";
import { authService } from "../services/authService";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "vue-router";

const identifier = ref("");
const password = ref("");
const authStore = useAuthStore();
const router = useRouter();

async function handleLogin() {
  try {
    const { data } = await authService.login({
      identifier: identifier.value,
      password: password.value,
    });
    authStore.setAuth(data.token, data.user);
    Swal.fire("Bienvenido", "Inicio de sesión exitoso", "success");
    router.push("/home");
  } catch (error) {
    Swal.fire("Error", "Credenciales incorrectas", "error");
  }
}
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 100px auto;
  background: #fdfdfd;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(180, 180, 180, 0.3);
}
button {
  background: #a8dadc;
  border: none;
}
button:hover {
  background: #81b29a;
}
</style>
