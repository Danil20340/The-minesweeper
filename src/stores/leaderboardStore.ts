import { defineStore } from 'pinia';

export const useLeaderboardStore = defineStore('leaderboard', {
  state: () => ({
    scores: JSON.parse(localStorage.getItem('leaderboard') || '[]') as { name: string; time: number }[],
  }),
  actions: {
    addResult(name: string, time: number) {
      this.scores.push({ name, time });
      this.scores.sort((a, b) => a.time - b.time);
      this.scores = this.scores.slice(0, 10); // Хранить только топ-10
      localStorage.setItem('leaderboard', JSON.stringify(this.scores));
    },
  },
});
