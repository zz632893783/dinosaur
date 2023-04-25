<template>
    <transition appear mode="out-in">
        <slot></slot>
    </transition>
</template>
<script setup>
import { ref } from 'vue'
const msg = ref('myTransition')
</script>
<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity .25s ease, transform .25s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
.v-leave-to {
    transform: translateY(-10px);
}
.v-enter-from {
    transform: translateY(10px);
}
</style>
