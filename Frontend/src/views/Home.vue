<template>
<DisplayPedastel>
  <RouterLink to="/Game"> <button onclick="new_game()">New Game</button></RouterLink>
  <RouterLink to="/GameJoin"><button>Join Game</button></RouterLink>
</DisplayPedastel>
</template>
  
<script setup>
import DisplayPedastel from '@/components/DisplayPedastel.vue';
import { RouterLink } from 'vue-router';
import { initializeSocket } from '@/ServiceWebsocket';
</script>
<script>
const socket = new WebSocket('ws://localhost:3000');
function new_game(){
  socket = initializeSocket();
  socket.send(JSON.stringify({type:'new'}))
}

</script>
  
  <style scoped>
  .basic-view {
    padding: 20px;
    text-align: center;
  }
  
  .basic-view h1 {
    color: #333;
    font-size: 2rem;
  }
  
  .basic-view p {
    color: #666;
    font-size: 1rem;
  }
  </style>
  