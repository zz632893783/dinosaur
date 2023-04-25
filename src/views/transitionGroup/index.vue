<template>
	<el-button type="primary" v-on:click="randomAdd">随机添加</el-button>
	<el-button type="primary" v-on:click="randomRemove">随机删除</el-button>
	<el-button type="primary" v-on:click="randomDisruption">打乱</el-button>
	<br />
	<el-input v-model="query"></el-input>
	<!-- {{ typeof computeList }} -->
	<transition-group name="list" appear>
		<li class="item" v-for="n in computeList" v-bind:key="n.msg">{{ n.msg }}</li>
	</transition-group>
</template>
<script setup>
import { ref, computed } from 'vue'
const list = ref([
	{ msg: 'Bruce Lee' },
	{ msg: 'Jackie Chan' },
	{ msg: 'Chuck Norris' },
	{ msg: 'Jet Li' },
	{ msg: 'Kung Fury' }
])
const randomAdd = () => {
	const n = list.value.length
	const index = Math.round(Math.random() * list.value.length)
	list.value.splice(index, 0, n)
}
const randomRemove = () => {
	const index = Math.floor(Math.random() * list.value.length)
	list.value.splice(index, 1)
}
const randomDisruption = () => {
	list.value.sort(() => Math.random() - 0.5)
}
const query = ref('')
// console.log(computed)
const computeList = computed(() => {
	return !query.value ? list.value : list.value.filter(n => n.msg.includes(query.value))
})
// const computeList = computed(() => {
// 	return 2333
// })
</script>
<style lang="scss" scoped>
.item {
	font-size: 20px;
	border: 1px solid;
	line-height: 32px;
}
.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
	transition: all .5s ease;
}

.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
	position: absolute;
}
</style>