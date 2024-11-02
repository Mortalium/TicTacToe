
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import GameJoin from '@/views/GameJoin.vue'
import Game from "@/views/Game.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component:Home
    },{
      path:"/GameJoin",
      name: "GameJoin",
      component:GameJoin
    }
  ,{
    path:"/Game",
    name:"game",
    component:Game
  }
  ]
})

export default router
