<template>
  <div class="home-container">
    <Navbar @logout="logoutUser" />

    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

function logoutUser() {
  authStore.clearAuth();
  router.push("/");
}
</script>

<style scoped>
.home-container {
  display: flex;
  min-height: 100vh;
  background-color: #121212; /* Fondo oscuro elegante */
  color: #e0e0e0;
}

.content {
  flex-grow: 1;
  padding: 40px;
  background-color: #1e1e1e;
  border-left: 1px solid #2a2a2a;
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.2);
  border-radius: 0 15px 15px 0;
}
</style>
