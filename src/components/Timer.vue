<script setup lang="ts">
import { ref, computed, onUnmounted, watch } from 'vue';
import { useGameStore } from '@/stores/gameStore'
const gameStore = useGameStore()
const props = defineProps<{ isRunning: boolean }>();
const emit = defineEmits(['update:time']);

// Текущее время в секундах
const time = ref(0);
let timer: ReturnType<typeof setInterval> | null = null;

// Форматируем в MM:SS
const formattedTime = computed(() => {
  const minutes = Math.floor(time.value / 60).toString().padStart(2, '0');
  const seconds = (time.value % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
});

// Запуск таймера
const startTimer = () => {
  resetTimer();
  if (!timer) {
    timer = setInterval(() => {
      time.value++;
      emit('update:time', time.value);
      if (time.value === gameStore.elapsedTime) {
        stopTimer();
        gameStore.setGameOver();
      }
    }, 1000);
  }
};

// Остановка таймера
const stopTimer = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
};

// Сброс таймера
const resetTimer = () => {
  stopTimer();
  time.value = 0;
};

// Авто-запуск и остановка при изменении `isRunning`
watch(() => props.isRunning, (newVal) => {
  if (newVal) startTimer();
  else stopTimer();
});

// Очистка таймера при удалении компонента
onUnmounted(stopTimer);
</script>

<template>
  <BBadge class="gap-2 fs-3" variant="danger">
    <i class="bi bi-alarm"></i>
    {{ formattedTime }}
  </BBadge>
</template>
