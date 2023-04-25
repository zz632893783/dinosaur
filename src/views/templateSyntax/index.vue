<template>
	<!-- 动态参数 -->
	<a v-bind:[attributeName]="attributeValue"></a>
	<!-- 动态事件 -->
	<a v-on:[eventName]="eventFunc">eventFunc</a>
	<!-- 属性集合 -->
	<a v-bind="attributeObject"></a>
</template>
<script setup>
import { ref } from 'vue'
// 动态参数
const attributeName = ref('name')
const attributeValue = ref('value')
// 动态事件
const eventName = ref('click')
// 属性集合
const attributeObject = {
	name: 'value',
	age: 12
}
const eventFunc = () => console.log('eventFunc')
</script>
