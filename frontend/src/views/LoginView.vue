<template>
  <div class="auth-container">
    <h2 class="text-center mb-4 title">Iniciar Sesión</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label>Usuario o correo</label>
        <input type="text" v-model="username" required />
      </div>

      <div class="form-group">
        <label>Contraseña</label>
        <input type="password" v-model="password" required />
      </div>

      <button type="submit" class="btn-auth">Ingresar</button>
    </form>

    <p class="auth-link">
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

const username = ref("");
const password = ref("");
const authStore = useAuthStore();
const router = useRouter();

async function handleLogin() {
  try {
    const res = await authService.login({
      identifier: username.value,
      password: password.value,
    });
    authStore.setAuth(res.data);
    Swal.fire("¡Bienvenido!", "Inicio de sesión exitoso", "success");
    router.push("/home");
  } catch (error) {
    Swal.fire("Error", "Credenciales inválidas", "error");
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

.auth-container {
  max-width: 420px;
  margin: 10vh auto;
  background: #1e1e1e;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.4);
  color: #e0e0e0;
  font-family: "Poppins", sans-serif;
}

.title {
  font-weight: 600;
  color: #f0f0f0;
}

.form-group {
  margin-bottom: 18px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: #c0c0c0;
}

input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #333;
  background-color: #2a2a2a;
  color: #f0f0f0;
  transition: 0.3s;
}

input:focus {
  border-color: #4a90e2;
  outline: none;
  background-color: #323232;
}

.btn-auth {
  width: 100%;
  background: linear-gradient(135deg, #4a90e2, #007aff);
  border: none;
  padding: 12px;
  border-radius: 10px;
  color: white;
  font-weight: 600;
  font-size: 16px;
  transition: 0.3s;
}

.btn-auth:hover {
  background: linear-gradient(135deg, #357ab7, #0062cc);
}

.auth-link {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
}

.auth-link a {
  color: #4a90e2;
  text-decoration: none;
}

.auth-link a:hover {
  text-decoration: underline;
}
</style>
