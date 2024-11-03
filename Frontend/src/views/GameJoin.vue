<template>
<DisplayPedastel>
    <form>
        <input type="Code" required>
        <RouterLink to="/Game"><button>Join</button></RouterLink>
    </form>
</DisplayPedastel>

</template>
<script setup>
import DisplayPedastel from '@/components/DisplayPedastel.vue';
import { RouterLink } from 'vue-router';
</script>
<style></style>