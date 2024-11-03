<template>
<DisplayPedastel>
    <form>
        <input type="number">
        <RouterLink to="/Game"><button>Join</button></RouterLink>
    </form>
</DisplayPedastel>

</template>
<script setup>
import DisplayPedastel from '@/components/DisplayPedastel.vue';
import { RouterLink } from 'vue-router';
</script>
<script>

</script>
<style></style>