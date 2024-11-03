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
import { onMounted, onUnmounted, ref } from 'vue';
import { eventBus,sendCode } from '@/serviceWebsocket';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(()=>{
    eventBus.on('navigate',(path)=>{
        router.push(path);
    });
});

onUnmounted(()=>{
    eventBus.off('navigate',(path)=>{
        router.push(path);
    });
});

</script>
<script>
const join_code = ref('');

function check_code(code){
    sendCode(code);
}

</script>
<style></style>