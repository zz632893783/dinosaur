<template>
	<ul>
		<li v-for="n in 15" v-bind:key="n" :ref="handleRef">{{ n }}</li>
	</ul>
</template>
<script setup>
import { ref, onMounted } from 'vue'
const itemRefs = []
const handleRef = el => itemRefs.push(el)
onMounted(() => {
	console.log(itemRefs)
})
</script>