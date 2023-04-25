<template>
	<button v-on:click="greet">233</button>
</template>
<script setup>
import { ref } from 'vue'
const name = ref('Vue.js')
function greet (event) {
	alert(`Hello ${name.value}!`)
	if (event) {
		alert(event.target.tagName)
	}
}
</script>