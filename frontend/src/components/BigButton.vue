<template>
  <div class="center">
    <button
      class="big-btn"
      @mousedown="startPress"
      @mouseup="stopPress"
      @mouseleave="stopPress"
    >
      <i class="bi bi-hand-index-thumb"></i>
    </button>
    <p class="counter">{{ count }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { userService } from "../services/userService";
import { showSuccess } from "../utils/helpers";

const count = ref(0);
let pressing = false;

function startPress() {
  pressing = true;
  const interval = setInterval(() => {
    if (!pressing) clearInterval(interval);
    else count.value++;
  }, 100);
}

async function stopPress() {
  pressing = false;
  if (count.value > 0) {
    await userService.addPoints(count.value);
    showSuccess(`Se añadieron ${count.value} puntos`);
  }
}
</script>

<style scoped>
.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;
}
.big-btn {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(145deg, #fbc2eb, #a6c1ee);
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  font-size: 3rem;
  cursor: pointer;
}
.big-btn:active {
  transform: scale(0.95);
}
.counter {
  font-size: 2rem;
  color: #444;
  margin-top: 15px;
}
</style>
