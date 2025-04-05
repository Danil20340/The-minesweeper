import { defineStore } from 'pinia';
import { ref, triggerRef } from 'vue';
import { generateBoard } from '@/utils/generateBoard';
import { floodFill } from '@/utils/floodFill';
import { getNeighbors } from '@/utils/getNeighbors';

export const useGameStore = defineStore('game', () => {
  const difficulty = ref('easy');
  const width = ref(8);
  const height = ref(8);
  const board = ref<Cell[][]>([]);
  const mines = ref(0);
  const flagsLeft = ref(0);
  const startTime = ref<Date | null>(null);
  const endTime = ref<Date | null>(null);
  const elapsedTime = ref(0);
  const gameOver = ref(false);
  const gameStarted = ref(false);
  const isWinModalVisible = ref(false);
  const setDifficulty = (level: string) => {
    difficulty.value = level;
    startTime.value = null;
    gameStarted.value = false;
    gameOver.value = false;
    if (level === 'easy') {
      width.value = 8;
      height.value = 8;
      mines.value = 10;
      elapsedTime.value = 600;
    } else if (level === 'medium') {
      width.value = 16;
      height.value = 16;
      mines.value = 40;
      elapsedTime.value = 2400;
    } else if (level === 'hard') {
      width.value = 32;
      height.value = 16;
      mines.value = 100;
      elapsedTime.value = 6000;
    }

    board.value = Array.from({ length: height.value }, () =>
      Array.from({ length: width.value }, () => ({
        isRevealed: false,
        isMine: false,
        flagState: null,
        adjacentMines: 0
      }))
    );
    triggerRef(board);
  };

  const startGame = (safeX: number, safeY: number) => {
    board.value = generateBoard(width.value, height.value, mines.value, safeX, safeY);
    gameOver.value = false;
    startTime.value = new Date();
    endTime.value = null;
    flagsLeft.value = 0;
    gameStarted.value = true;
    triggerRef(board);
  };

  const revealCell = (x: number, y: number) => {

    if (!gameStarted.value) {
      startGame(x, y);
    }

    if (gameOver.value) return;

    const cell = board.value[y][x];
    if (cell.isRevealed || cell.flagState) return;

    if (cell.isMine) {
      cell.isRevealed = true;
      setGameOver();
    } else floodFill(board.value, x, y);

    checkWin();
  };

  const toggleFlag = (x: number, y: number) => {
    if (gameOver.value) return;

    const cell = board.value[y][x];
    if (cell.isRevealed) return;

    if (!cell.flagState) {
      cell.flagState = 'flag';
      flagsLeft.value++;
    } else if (cell.flagState === 'flag') {
      cell.flagState = 'question'; 
      flagsLeft.value--; 
    } else {
      cell.flagState = null; 
    }
  };

  const setGameOver = () => {
    gameOver.value = true;
    startTime.value = null;
    board.value.forEach(row => {
      row.forEach(cell => {
        if (cell.isMine) {
          cell.isRevealed = true;
        }
      });
    })
  };

  const checkWin = () => {
    const allSafeCellsRevealed = board.value.flat().every(cell => cell.isMine || cell.isRevealed);
    if (allSafeCellsRevealed) {
      gameOver.value = true;
      endTime.value = new Date();
      isWinModalVisible.value = true;
    }
  };
  const revealAroundIfFlagsMatch = (x: number, y: number) => {
    const cell = board.value[y][x];
    if (!cell.isRevealed || !cell.adjacentMines) return;

    const neighbors = getNeighbors(board.value, x, y);

    const flaggedCount = neighbors.filter(n => n.cell.flagState === 'flag').length;

    if (flaggedCount === cell.adjacentMines) {
        neighbors.forEach(n => {
            if (!n.cell.isRevealed) {
                revealCell(n.x, n.y);
            }
        });
    }
};


  return { difficulty, width, height, board, mines, flagsLeft, startTime, endTime, elapsedTime, gameOver, gameStarted, setDifficulty, startGame, revealCell, setGameOver, toggleFlag, isWinModalVisible, revealAroundIfFlagsMatch };
});

