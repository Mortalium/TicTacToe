<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from "@/components/NavBar.vue"
</script>

<template>
  <NavBar class="Navbar" ><RouterLink to="/"><h1>Hello World</h1></RouterLink> </NavBar>
  <RouterView />
</template>

<style>
#app{
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  margin: 0px;
  padding: 0px;
}



</style>
