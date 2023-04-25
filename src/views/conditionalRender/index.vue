<template>
	<div v-show="type === 'A'">A</div>
	<div v-show="type === 'B'">B</div>
	<div v-show="type === 'C'">C</div>
	<el-button v-on:click="clickFunc">修改</el-button>
</template>
<script setup>
import { ref } from 'vue'
const type = ref('A')
const clickFunc = function () {
	type.value = ['A', 'B', 'C'][Math.floor(Math.random() * 3)]
}
</script>