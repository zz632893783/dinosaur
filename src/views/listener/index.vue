<template>
	<input v-model="state.count" />
	<input v-model="state.attr.name" />
	<input v-model="state.attr.person.value" />
	<div ref="val">{{ state.count }}</div>
</template>
<script setup>
import { ref, reactive, watch } from 'vue'
const state = reactive({
	count: 1,
	attr: {
		name: 10,
		person: {
			value: 3
		}
	}
})
const val = ref()
// watch(state.value, (newVal, oldVal) => {
// 	console.log(newVal, oldVal)
// })
// watch(() => state.count, (newVal, oldVal) => console.log(newVal, oldVal))
// watch(state, (newVal, oldVal) => console.log(newVal.count, oldVal.count))
watch(state, async (newVal, oldVal) => {
	await Promise.resolve()
	console.log(val?.value?.innerHTML)
}, { immediate: true })
// const state = reactive({
// 	count: 0,
// 	attr: {
// 		name: 100
// 	}
// })
// reactive 针对的是对象，以及属性为对象的属性，比如
// const state = reactive({
// 	// state.count 为简单值类型
// 	count: 0,
// 	// state.attr 为 Proxy 代理类型
// 	attr: {
// 		// state.attr.name 为简单值类型
// 		name: 100
// 	}
// })
// ref 包裹的值不被绑定在 .value 属性上
// 若 ref 包裹的是一个引用类型，则 state.value 相当于是用 reactive 处理了该引用类型
// const state = ref({
// 	count: 0,
// 	attr: {
// 		name: 100
// 	}
// })
</script>