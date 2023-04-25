<!-- 子组件 -->
<template>
	<slot :x="x" :y="y"></slot>
</template>
<script setup>
import { ref } from 'vue'
const x = ref(0)
const y = ref(0)
window.onmousemove = e => {
	x.value = e.clientX
	y.value = e.clientY
}
</script>