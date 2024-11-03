
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import GameJoin from '@/views/GameJoin.vue'
import Game from "@/views/Game.vue"
import Won from '@/views/Won.vue'
import Lost from '@/views/Lost.vue'
import Even from '@/views/Even.vue'

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
  },{
    path:"/Won",
    name:"Won",
    component: Won
  },{
    path:"/Lost",
    name:"Lost",
    component: Lost
  },{
    path:"/Even",
    name:"Even",
    component:Even
  }
  ]
})

export default router
