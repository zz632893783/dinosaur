<template>
    组合式函数
    <async-state></async-state>
</template>
<script setup>
import { useMouse } from './mouse.js'
import asyncState from './asyncState.vue'
const position = useMouse()
</script>
<style lang="scss" scoped></style>