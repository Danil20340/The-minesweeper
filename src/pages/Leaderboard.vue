<script setup lang="ts">
import { useLeaderboardStore } from '@/stores/leaderboardStore'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const leaderboardStore = useLeaderboardStore()
const items = computed(() =>
  leaderboardStore.scores.map(score => ({
    Имя: score.name,
    Время: `${Math.floor(score.time / 60)}:${(score.time % 60).toString().padStart(2, '0')}`
  }))
)
const fields = leaderboardStore.scores.length ? ['Имя', 'Время'] : ['Лучших игроков пока нет. Будьте первым!']
</script>

<template>
  <div class="container">
    <div class="border-responsive rounded bg-white p-sm-4 p-0 fs-4">
      <h2 class="d-flex justify-content-between">
        Таблица лидеров
        <BButton class="fs-4 float-end " @click="router.push('/')">
          <i class="bi bi-house-fill"></i>
        </BButton>
      </h2>
      <div class="table-responsive">
        <BTable class="table-group-divider fs-5 table-responsive" :items="items" :fields="fields" />
      </div>
    </div>
  </div>
</template>

<style>
caption {
  color: var(--bs-black-color) !important;
  font-weight: bold !important;
}
.border-responsive {
  border: none;
}

@media (min-width: 576px) {
  .border-responsive {
    border: 3px solid var(--bs-border-color, #dee2e6);
  }
}
</style>