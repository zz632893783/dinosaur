<template>
	<div>data: {{ data }}</div>
	<div>error: {{ error }}</div>
	<input v-model="url" />
</template>
<script setup>
import { ref, unref } from 'vue'
import { useFetch } from './fetch.js'
const url = ref('www.baidu.com')
const url2 = 'wwwwwwww'
const { data, error } = useFetch(url)
console.log(unref(url), unref(url2))
</script>