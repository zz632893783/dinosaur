<template>
    <button v-on:click="clickFunc">改变字体大小</button>
</template>
<script setup>
const emit = defineEmits(['changeSize'])
const clickFunc = () => emit('changeSize')
</script>