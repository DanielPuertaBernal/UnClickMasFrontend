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
  background: #fafafa;
}
.content {
  flex-grow: 1;
  padding: 20px;
}
</style>
