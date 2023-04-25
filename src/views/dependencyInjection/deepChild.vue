<template>
	<div class="child">
		<!-- {{ message.value.value }} -->
		<!-- <input :value="val" v-on:input="inputFunc" /> -->
		{{ message }}
	</div>
</template>
<script setup>
import { inject } from 'vue'
const message = inject('message')
console.log(message.value = 444)
</script>