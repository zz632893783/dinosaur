<template>
    x:{{x}}-y:{{y}}
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const x = ref(0)
const y = ref(0)
const update = (e) => {
    x.value = e.clientX
    y.value = e.clientY
}
onMounted(() => {
    window.addEventListener('mousemove', update)
})
onUnmounted(() => {
    window.removeEventListener('mousemove', update)
})
</script>
