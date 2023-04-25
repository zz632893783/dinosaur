<template>
	<child-component v-bind:name="name"></child-component>
</template>
<script setup>
import { ref } from 'vue'
import childComponent from './childComponent.vue'
const name = ref('name')
setTimeout(() => {
	name.value = 'namenamenamename'
}, 1000)
</script>
<style lang="scss" scoped></style>