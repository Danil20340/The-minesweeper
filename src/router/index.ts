import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Game from '@/pages/Game.vue'
import Leaderboard from '@/pages/Leaderboard.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/game', component: Game },
  // { path: '/leaderboard', component: Leaderboard }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
