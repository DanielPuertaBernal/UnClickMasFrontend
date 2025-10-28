<template>
  <div class="sidebar" :class="{ open: isOpen }">
    <button class="toggle-btn" @click="isOpen = !isOpen">
      <i class="bi bi-list"></i>
    </button>

    <ul v-if="isOpen" class="menu animate__animated animate__fadeInLeft">
      <li @click="$router.push('/home')"><i class="bi bi-house"></i> Inicio</li>
      <li @click="$router.push('/ranking')"><i class="bi bi-trophy"></i> Ranking</li>
      <li @click="logout"><i class="bi bi-box-arrow-right"></i> Cerrar sesión</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "vue-router";
import { showSuccess } from "../utils/helpers";

const isOpen = ref(false);
const auth = useAuthStore();
const router = useRouter();

function logout() {
  auth.clearAuth();
  showSuccess("Sesión cerrada");
  router.push("/login");
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 60px;
  background: #a1c4fd;
  transition: width 0.3s;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
}
.sidebar.open {
  width: 200px;
}
.toggle-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  margin: 10px;
}
.menu {
  list-style: none;
  padding: 10px;
  color: white;
}
.menu li {
  margin: 15px 0;
  cursor: pointer;
}
.menu li:hover {
  color: #333;
}
</style>
