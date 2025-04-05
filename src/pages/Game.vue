<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/gameStore'
import Cell from '@/components/Cell.vue'
import Timer from '@/components/Timer.vue'
import Mines from '@/components/Mines.vue'
import WinnerModal from '@/components/WinnerModal.vue'
import GameRule from '@/components/GameRule.vue'

const router = useRouter()
const gameStore = useGameStore()
gameStore.setDifficulty(gameStore.difficulty)
const restartGame = () => {
  gameStore.setDifficulty(gameStore.difficulty)
}
</script>

<template>
  <div class="d-flex flex-column border-responsive rounded p-sm-3 p-0" style="width: fit-content; max-width: 100%;">
    <div class="d-flex gap-2 justify-content-between align-items-center pt-2 pb-2 flex-sm-row flex-column-reverse">
      <div class="d-flex gap-3">
        <Mines :count="gameStore.gameStarted ? gameStore.mines - gameStore.flagsLeft : gameStore.mines" />
        <Timer :is-running="gameStore.gameStarted && !gameStore.gameOver" />
      </div>
      <div class="d-flex gap-3">
        <BButton class="fs-4" @click="router.push('/')"><i class="bi bi-house-fill"></i></BButton>
        <BButton class="fs-4" @click="restartGame"><i class="bi bi-arrow-clockwise"></i></BButton>
        <GameRule />
      </div>
    </div>

    <div class="d-flex flex-column gap-1 border border-4 border-dark-subtle rounded p-1 overflow-auto">
      <div disabled="gameStore.gameOver" class="gap-1 d-flex" v-for="(row, y) in gameStore.board" :key="y">
        <Cell v-for="(cell, x) in row" :key="x" :x="x" :y="y" />
      </div>
    </div>
    <WinnerModal />
  </div>
</template>
<style>
.border-responsive {
  border: none;
  max-height: 500px;
}

@media (min-width: 576px) {
  .border-responsive {
    border: 3px solid var(--bs-border-color, #dee2e6);
    max-height: 748px;
  }
}
</style>