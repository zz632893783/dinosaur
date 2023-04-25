<template>
    <button v-on:click="active = (active + 1) % 3">切换</button>
    <my-transition>
        <div v-if="active === 0">111</div>
        <div v-else-if="active === 1">222</div>
        <div v-else>333</div>
    </my-transition>
    <button v-on:click="changeComponent">切换组件</button>
    <br />
    <br />
    <br />
    <br />
    <!-- <my-button></my-button> -->
    <transition mode="out-in">
        <component :is="components[activeCompoent]"></component>
    </transition>
</template>
<script setup>
import { ref } from 'vue'
import myTransition from './myTransition.vue'
import myButton from './myButton.vue'
import myCircle from './myCircle.vue'
const show = ref(true)
const active = ref(0)
const components = [myButton, myCircle]
const activeCompoent = ref(0)
const changeComponent = () => {
    activeCompoent.value = (activeCompoent.value + 1) % components.length
}
</script>
<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
    transition: .25s ease;
}
.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>