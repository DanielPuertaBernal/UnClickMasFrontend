<template>
  <nav class="navbar">
    <h1>UnClickMás</h1>
    <div class="user-info">
      <i class="bi bi-person-circle"></i>
      <span>{{ userName }}</span>
    </div>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "../store/authStore";

const auth = useAuthStore();
const userName = computed(() => auth.user?.username);
</script>

<style scoped>
.navbar {
  width: 100%;
  height: 60px;
  background: linear-gradient(90deg, #a1c4fd, #c2e9fb);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.navbar h1 {
  font-size: 1.3rem;
  color: #333;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #333;
}
.user-info i {
  font-size: 1.5rem;
}
</style>
