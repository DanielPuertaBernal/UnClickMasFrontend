<template>
  <div class="sidebar" :class="{ open: isOpen }">
    <button class="toggle-btn" @click="isOpen = !isOpen">
      <i class="bi bi-list"></i>
    </button>

    <transition name="fade">
      <ul v-if="isOpen" class="menu">
        <li @click="$router.push('/home')"><i class="bi bi-house"></i> Inicio</li>
        <li @click="$router.push('/ranking')"><i class="bi bi-trophy"></i> Ranking</li>
        <li @click="logout"><i class="bi bi-box-arrow-right"></i> Cerrar sesión</li>
      </ul>
    </transition>
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
  width: 65px;
  background: #2d3142;
  color: #fff;
  transition: width 0.3s ease;
  overflow: hidden;
  z-index: 100;
}
.sidebar.open {
  width: 210px;
}
.toggle-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.7rem;
  margin: 15px;
  cursor: pointer;
}
.menu {
  list-style: none;
  padding: 20px 10px;
}
.menu li {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 18px 0;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
}
.menu li:hover {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding-left: 8px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
