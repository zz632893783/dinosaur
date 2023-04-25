<template>
    <!-- <div class="count" ref="countDom" v-on:click="clickFunc">点击 {{ state.count }}</div> -->
    <!-- <div ref="countDom" v-on:click="clickDeep">点击 {{ obj }}</div> -->
    <!-- <div v-on:click="foo++" style="font-size: 32px;">{{ object.foo }}</div> -->
    {{ state }}
</template>
<script setup>
import { reactive, ref, nextTick } from 'vue'
// const object = {
//     foo: ref(1)
// }
// const { foo } = object
const state = reactive({
    count: {
        age: {
            // name: ref(1)
            name: ref(1)
        }
    }
})
// const count = state.count
// // console.log(state, state.count)
console.log(state.count.age.name)
</script>