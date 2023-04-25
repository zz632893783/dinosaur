<template>
	<div class="page">
		依赖注入
		<input v-model="name" />
		<child></child>
	</div>
</template>
<script setup>
import { provide, ref, readonly } from 'vue'
import child from './child.vue'
const name = ref('name')
// provide('message', readonly(name))
provide('message', name)
name.value = 2333
</script>
<style lang="scss" scoped></style>
