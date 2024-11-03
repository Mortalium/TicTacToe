<template>
<DisplayPedastel>
    <form @submit.prevent="check_code(join_code)">
        <input type="number" v-model="join_code" required>
        <button type="submit">Join</button>
    </form>
</DisplayPedastel>

</template>
<script setup>
import DisplayPedastel from '@/components/DisplayPedastel.vue';
import { ref } from 'vue';
import { sendCode } from '@/serviceWebsocket';
</script>
<script>
const join_code = ref('');

function check_code(code){
    sendCode(code);
}

</script>
<style></style>