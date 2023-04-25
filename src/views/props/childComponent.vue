<template>
	{{ privateName }}
</template>
<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
	name: {
		type: String,
		default: function () {
			return '123'
		}
	}
})
const privateName = computed(() => `@${props.name}@`)
// setTimeout(() => {
// 	privateName.value = 'namenamenamename'
// }, 1000)
</script>
