<template>
    <p v-on:click="author.books.push(233)">Has published books:</p>
    <span>{{ publishedBooksMessage }}</span>
    {{ fullName }}
    <br />
    <input v-model="fullName"/>
    <!-- <button v-on:click="fullName = 'Zheng Zhang'">修改</button> -->
</template>
<script setup>
import { ref, reactive, computed } from 'vue'
const author = reactive({
    name: 'John Doe',
    books: [
        'Vue 2',
        'Vue 3',
        'Vue 4'
    ]
})
// const publishedBooksMessage = computed(() => author.books.length > 0 ? 'Yes' : 'No')
const publishedBooksMessage = computed(() => author.books.length)
console.log('publishedBooksMessage', publishedBooksMessage.value)
const firstName = ref('John')
const lastName = ref('Doe')
const fullName = computed({
    get () {
        return `${firstName.value} ${lastName.value}`
    },
    set (newValue) {
        [firstName.value, lastName.value] = newValue.split(' ')
    }
})
</script>
