<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/gameStore'
import CustomBoardModal from '@/components/CustomBoardModal.vue'
import Bomb from '@/assets/bomb.svg'

const router = useRouter()
const gameStore = useGameStore()
const customBoardModalVisible = ref(false)
const difficulty = ref('easy')
const difficultyLabel = computed(() => {
  switch (difficulty.value) {
    case 'easy': return 'Простой (8x8, 10 мин)';
    case 'medium': return 'Средний (16x16, 40 мин)';
    case 'hard': return 'Сложный (32x16, 100 мин)';
    case 'custom': return 'Кастомный режим';
    default: return 'Выберите сложность';
  }
});
const setDifficulty = (level: string) => {
  difficulty.value = level;
};
const startGame = () => {
  gameStore.setDifficulty(difficulty.value)
  router.push('/game')
}
</script>

<template>
  <BListGroup class="d-flex flex-column align-items-center p-4 border border-secondary gap-2 bg-light-secondary">
    <h1 class="d-flex align-items-center text-center gap-1">Сапёр
      <img :src="Bomb" alt="Bomb" style="width: 40px; height: 40px;">
    </h1>
    <div class="d-flex align-items-center gap-4 flex-sm-row flex-column">
      <BDropdown :text="difficultyLabel" variant="secondary">
        <BDropdownItem @click="setDifficulty('easy')">Простой (8x8, 10 мин)</BDropdownItem>
        <BDropdownItem @click="setDifficulty('medium')">Средний (16x16, 40 мин)</BDropdownItem>
        <BDropdownItem @click="setDifficulty('hard')">Сложный (32x16, 100 мин)</BDropdownItem>
        <BDropdownItem @click="setDifficulty('custom'), customBoardModalVisible = true">Кастомный режим</BDropdownItem>
      </BDropdown>
      <BButton variant="primary" @click="startGame">Начать игру</BButton>
      <BButton to="/leaderboard">Таблица лидеров</BButton>
    </div>
  </BListGroup>
  <CustomBoardModal v-model="customBoardModalVisible" />
</template>
