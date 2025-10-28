<template>
  <div class="ranking-container">
    <h2 class="mb-3">🏆 Ranking de Jugadores</h2>

    <input
      v-model="searchQuery"
      type="text"
      class="form-control mb-3"
      placeholder="Buscar jugador..."
    />

    <ul class="list-group">
      <li
        v-for="(user, index) in filteredUsers"
        :key="user.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <span>
          <strong>{{ index + 1 }}.</strong> {{ user.username }}
        </span>
        <span class="badge bg-success">{{ user.totalPoints }} pts</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { userService } from "../services/userService";
import Swal from "sweetalert2";

const users = ref([]);
const searchQuery = ref("");

onMounted(async () => {
  try {
    const { data } = await userService.getLeaderboard();
    users.value = data;
  } catch (error) {
    Swal.fire("Error", "No se pudo cargar el ranking", "error");
  }
});

const filteredUsers = computed(() =>
  users.value.filter(u =>
    u.username.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);
</script>

<style scoped>
.ranking-container {
  max-width: 600px;
  margin: auto;
  background: #ffffff;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(200, 200, 200, 0.3);
}
input {
  border-radius: 10px;
}
</style>
