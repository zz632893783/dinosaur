<!-- 父组件 -->
<template>
	<find-mouse-position v-slot="scoped">
		{{ scoped }}
	</find-mouse-position>
</template>
<script setup>
import findMousePosition from './findMousePosition.vue'
</script>
