<script setup lang="ts">
import { computed, ref } from 'vue';
import { useGameStore } from '@/stores/gameStore';

const props = defineProps<{ x: number; y: number }>();
const gameStore = useGameStore();
const highlightCells = ref(false);
const cell = computed(() => gameStore.board[props.y]?.[props.x]);

const revealCell = () => {
  if (cell.value?.flagState) return;
  gameStore.revealCell(props.x, props.y);
};

const toggleFlag = () => {
  gameStore.toggleFlag(props.x, props.y);
};

// ===================
// Mobile: long press = средняя кнопка
let longPressTimer: ReturnType<typeof setTimeout> | null = null;
const startLongPress = () => {
  longPressTimer = setTimeout(() => {
    triggerMiddleAction();
    releaseMiddleAction();
  }, 500);
};

const cancelLongPress = () => {
  if (longPressTimer) {
    clearTimeout(longPressTimer);
    longPressTimer = null;
  }
};

// ===================
// Mobile: двойной тап = флаг
let lastTap = 0;
let tapTimeout: ReturnType<typeof setTimeout> | null = null;

const handleMobileTap = () => {
  const now = Date.now();
  const delta = now - lastTap;

  if (delta < 500 && delta > 0) {
    if (tapTimeout) clearTimeout(tapTimeout);
    tapTimeout = null;
    toggleFlag(); // двойной тап → флажок
  } else {
    tapTimeout = setTimeout(() => {
      revealCell();
      tapTimeout = null;
    }, 400);
  }

  lastTap = now;
};

// ===================
// Desktop: средняя кнопка мыши
let holdTimer: number | null = null;

const triggerMiddleAction = () => {
  if (!cell.value?.isRevealed || !cell.value.adjacentMines) return;

  highlightCells.value = true;
  holdTimer = setTimeout(() => {
    holdTimer = null;
  }, 1000);
};

const releaseMiddleAction = () => {
  highlightCells.value = false;
  if (holdTimer) {
    clearTimeout(holdTimer);
    holdTimer = null;
    gameStore.revealAroundIfFlagsMatch(props.x, props.y);
  }
};

const onMiddleMouseDown = (event: MouseEvent) => {
  if (event.button === 1) triggerMiddleAction();
};
const onMiddleMouseUp = (event: MouseEvent) => {
  if (event.button === 1) releaseMiddleAction();
};

// ===================
// Цвет цифры
const getTextColor = computed(() => {
  const colors: Record<number, string> = {
    1: 'blue',
    2: 'green',
    3: 'red',
    4: 'darkblue',
    5: 'brown',
    6: 'turquoise',
    7: 'black',
    8: 'white'
  };
  return cell.value?.adjacentMines ? colors[cell.value.adjacentMines] : 'black';
});
</script>

<template>
  <BButton @click.prevent="handleMobileTap" @contextmenu.prevent="toggleFlag" @mousedown="onMiddleMouseDown"
    @mouseup="onMiddleMouseUp" @touchstart="startLongPress" @touchend="cancelLongPress" @touchcancel="cancelLongPress"
    :variant="cell?.isRevealed ? (cell.isMine ? 'danger' : 'light') : 'secondary'"
    :disabled="(cell?.isMine && cell?.isRevealed) || gameStore.gameOver"
    :style="{ color: getTextColor, backgroundColor: highlightCells ? 'yellow' : '' }"
    style="min-width: 27px; min-height: 25px; width: min(50px, 4vh); height: min(50px, 3vh); opacity: 100%;"
    class="cell no-opacity fw-bold p-1 col flex-fill border border-1 border-dark-subtle">
    {{
      cell?.flagState === 'flag'
        ? '🚩'
        : cell?.flagState === 'question'
          ? '❓'
          : cell?.isRevealed
            ? cell.isMine
              ? '💣'
              : cell.adjacentMines || ''
            : ''
    }}
  </BButton>
</template>

<style>
.no-opacity:disabled {
  opacity: 1 !important;
}

.cell {
  --bs-btn-line-height: 0.5 !important;
}
</style>
