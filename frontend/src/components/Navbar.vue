<template>
  <nav class="sidebar">
    <div class="logo-section">
      <i class="bi bi-book-half logo-icon"></i>
      <h2 class="logo-text">UnClickMás</h2>
    </div>

    <ul class="menu">
      <li
        v-for="item in menuItems"
        :key="item.route"
        :class="{ active: isActive(item.route) }"
        @click="navigate(item.route)"
      >
        <i :class="item.icon"></i>
        <span>{{ item.label }}</span>
      </li>
    </ul>

    <div class="logout-section" @click="emitLogout">
      <i class="bi bi-box-arrow-right"></i>
      <span>Cerrar sesión</span>
    </div>
  </nav>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { defineEmits } from "vue";

const emit = defineEmits(["logout"]);
const router = useRouter();
const route = useRoute();

const menuItems = [
  { label: "Inicio", icon: "bi bi-house-door", route: "/home" },
  { label: "Perfil", icon: "bi bi-person-circle", route: "/profile" },
  { label: "Entrenamientos", icon: "bi bi-activity", route: "/training" },
  { label: "Estadísticas", icon: "bi bi-bar-chart-line", route: "/stats" },
  { label: "Configuración", icon: "bi bi-gear", route: "/settings" },
];

function navigate(path) {
  router.push(path);
}

function isActive(path) {
  return route.path === path;
}

function emitLogout() {
  emit("logout");
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #181818;
  color: #e0e0e0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px 15px;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.5);
  border-right: 1px solid #222;
  font-family: "Poppins", sans-serif;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
}

.logo-icon {
  font-size: 1.8rem;
  color: #4a90e2;
}

.logo-text {
  font-size: 1.2rem;
  font-weight: 600;
  color: #f5f5f5;
}

.menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 15px;
  margin-bottom: 8px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
  font-weight: 500;
}

.menu li:hover {
  background-color: #252525;
  color: #4a90e2;
}

.menu li.active {
  background-color: #2b2b2b;
  color: #4a90e2;
  box-shadow: inset 2px 0 0 #4a90e2;
}

.menu i {
  font-size: 1.2rem;
}

.logout-section {
  margin-top: 25px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 15px;
  border-radius: 10px;
  cursor: pointer;
  color: #ff6b6b;
  transition: 0.3s;
}

.logout-section:hover {
  background-color: #2b2b2b;
  color: #ff8585;
}
</style>
