<!-- 子组件 -->
<template>
	<!-- 子组件 author 控制部分 -->
	<input :value="author" @input="inputFunc('author', $event)" />
	<!-- 子组件 title 控制部分 -->
	<input :value="title" @input="inputFunc('title', $event)" />
</template>
<script setup>
defineProps([
	'author',
	'title'
])
const emit =defineEmits([
	'update:author',
	'update:title'
])
const inputFunc = (type, e) => {
	emit(`update:${type}`, e.target.value)
}
</script>