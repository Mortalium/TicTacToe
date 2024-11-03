<template>
<DisplayPedastel>
    <form>
        <input type="number" id="join_code" required>
        <button onclick="check_code(join_code)">Join</button>
    </form>
</DisplayPedastel>

</template>
<script setup>
import DisplayPedastel from '@/components/DisplayPedastel.vue';
import { RouterLink } from 'vue-router';
import { sendCode } from '@/serviceWebsocket';
</script>
<script>
function check_code(code){
    sendCode(code)
}

</script>
<style></style>