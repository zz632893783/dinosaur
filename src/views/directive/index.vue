<template>
	<input v-focus />
</template>
<script setup>
const vFocus = {
	mounted: el => el.focus()
}
</script>
<style lang="scss" scoped></style>