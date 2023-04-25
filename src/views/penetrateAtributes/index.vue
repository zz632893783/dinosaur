<template>
	<my-button class="large" @click="clickFunc" title="233"></my-button>
</template>
<script setup>
import myButton from './myButton.vue'
const clickFunc = () => console.log('parent Click')
</script>
<style lang="scss" scoped></style>