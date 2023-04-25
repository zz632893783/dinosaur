<!-- 子组件 -->
<template>
	<input :value="modelValue" @input="inputFunc" />
</template>
<script setup>
const props = defineProps(['modelValue', 'modelModifiers'])
const emit = defineEmits(['update:modelValue'])
const inputFunc = e => {
	let inputValue = e.target.value
	props.modelModifiers
		&& props.modelModifiers.capitalize
		&& (inputValue = `${inputValue[0].toUpperCase()}${inputValue.slice(1)}`)
	emit('update:modelValue', inputValue)
}
</script>