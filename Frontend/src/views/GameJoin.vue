<template>
<DisplayPedastel>
    <form>
        <input type="number" id="join_code" required>
        <RouterLink to="/Game"><button onclick="check_code(join_code)">Join</button></RouterLink>
    </form>
</DisplayPedastel>

</template>
<script setup>
import DisplayPedastel from '@/components/DisplayPedastel.vue';
import { RouterLink } from 'vue-router';
</script>
<script>
function check_code(code){
    socket.send(JSON.stringify({type:"join",sessionId:code}))
    
}

</script>
<style></style>