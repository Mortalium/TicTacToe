<script setup>
import NavBar from "@/components/NavBar.vue";
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <NavBar class="Navbar" ><RouterLink to="/"><h1>Tic Tac Toe!</h1></RouterLink> </NavBar>
  <RouterView />
</template>

<style>
#app {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    background-color: #b3e5fc;
}

h1 {
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 50px;
    border-bottom: 2px solid black;
    padding-bottom: 10px;
}

button {
    width: 200px;
    padding: 15px;
    margin: 10px 0;
    font-size: 20px;
    border: 2px solid black;
    background-color: #ffffff;
    color: black;
    cursor: pointer;
    border-radius: 5px;
    transition: all 0.3s;
}

button:hover {
    background-color: #f0f0f0;
}

</style>
