<template>
  <div class="ranking-container">
    <h2 class="ranking-title"><i class="bi bi-trophy me-2"></i>Ranking General</h2>

    <table class="ranking-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Usuario</th>
          <th>Cerebritos</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in ranking" :key="user.id">
          <td>{{ index + 1 }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.braincoins }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { userService } from "../services/userService";

const ranking = ref([]);

onMounted(async () => {
  ranking.value = await userService.getLeaderboard();
});
</script>

<style scoped>
.ranking-container {
  background-color: #1e1e1e;
  color: #e0e0e0;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
  font-family: "Poppins", sans-serif;
}

.ranking-title {
  font-size: 1.6rem;
  font-weight: 600;
  color: #4a90e2;
  margin-bottom: 20px;
}

.ranking-table {
  width: 100%;
  border-collapse: collapse;
}

.ranking-table th,
.ranking-table td {
  border-bottom: 1px solid #333;
  padding: 12px;
  text-align: left;
}

.ranking-table th {
  color: #a0a0a0;
  font-weight: 500;
}

.ranking-table tr:hover {
  background-color: #252525;
}
</style>
