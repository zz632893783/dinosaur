<!-- 父组件 -->
<template>
    <div :style="`font-size: ${fontSize}px;`">测试字体</div>
    <size-button v-on:changeSize="fontSize = fontSize + 1"></size-button>
</template>
<script setup>
import { ref } from 'vue'
import sizeButton from './sizeButton.vue'
const fontSize = ref(14)
</script>