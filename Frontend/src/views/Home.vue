<template>
<DisplayPedastel>
  <RouterLink to="/Game"> <button>New Game</button></RouterLink>
  <RouterLink to="/GameJoin"><button>Join Game</button></RouterLink>
</DisplayPedastel>
</template>
  
<script setup>
import DisplayPedastel from '@/components/DisplayPedastel.vue';
import { RouterLink } from 'vue-router';
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
  