<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore'
import { useLeaderboardStore } from '@/stores/leaderboardStore'
import { ref } from 'vue';
const gameStore = useGameStore()
const playerName = ref('');
const leaderboardStore = useLeaderboardStore();
const saveResult = () => {
    if (playerName.value.trim()) {
        leaderboardStore.addResult(playerName.value, Math.floor((gameStore.endTime!.getTime() - gameStore.startTime!.getTime()) / 1000));
        gameStore.isWinModalVisible = false;
        playerName.value = '';
    }
};
</script>

<template>
    <BModal v-model="gameStore.isWinModalVisible" centered title="Новый рекорд!">
        <BFormInput maxlength="15" v-model="playerName" placeholder="Впишите свое имя для таблицы рекордов" />
        <template #footer>
            <BButton variant="primary" @click="saveResult">Ок</BButton>
        </template>
    </BModal>
</template>
