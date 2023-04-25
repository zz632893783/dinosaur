<template>
	<ul>
		<li v-for="(item, index) in list" :key="index">
			<slot name="item" v-bind="item"></slot>
		</li>
	</ul>
</template>
<script setup>
defineProps({
	list: {
		type: [Array],
		default: function () {
			return []
		}
	}
})
</script>