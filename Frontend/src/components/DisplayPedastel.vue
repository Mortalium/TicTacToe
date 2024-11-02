<template>
    <div class="pedestal">
        <slot></slot>
    </div>
</template>
<script>
</script>
<style scoped>
.pedestal{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: grey;
    padding: 30px;
    width: 60%;
    height: 60%;
    margin: auto;
    border-radius: 10px;
    
}
</style>