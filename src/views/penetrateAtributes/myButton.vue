<template>
	<!-- <div class="outer">
		<button v-bind="$attrs" class="my-button">{{ $attrs }}</button>
	</div> -->
	<button class="my-button">{{ $attrs }}</button>
	<button v-bind="$attrs" class="my-button">{{ $attrs }}</button>
	<button class="my-button">{{ $attrs }}</button>
</template>
<script setup>
import { useAttrs } from 'vue'
const attrs = useAttrs()
console.log(attrs.class, attrs.onClick)
</script>