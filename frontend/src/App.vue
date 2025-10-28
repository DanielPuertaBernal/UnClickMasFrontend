<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "./store/authStore";

const authStore = useAuthStore();

onMounted(() => {
  authStore.validateAuth();
});
</script>

<style>
body {
  margin: 0;
}
</style>

