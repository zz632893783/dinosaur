<template>
	{{ book }}<br/>
	<child-component v-model:author="book.author" v-model:title="book.title"></child-component><br/>
	{{ name }}
	<my-component v-model.capitalize="name"></my-component>
	<my-component v-model="name"></my-component>
</template>
<script setup>
import { ref } from 'vue'
import childComponent from './childComponent.vue'
import myComponent from './myComponent.vue'
const book = ref({
	author: 'zz',
	title: '自传'
})
const name = ref('name')
</script>
<style lang="scss" scoped></style>