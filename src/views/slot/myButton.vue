<template>
	<button class="my-button">
		<slot name="header" :count="1"></slot><br />
		<slot msg="message"></slot><br />
		<slot name="footer"></slot><br />
	</button>
</template>
<script setup></script>