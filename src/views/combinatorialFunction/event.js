import { onMounted, onUnmounted } from 'vue'
export function useEventListener (target, event, callback) {
	onMounted(() => {
		console.log('eventjs onMounted')
		target.addEventListener(event, callback)
	})
	onUnmounted(() => {
		console.log('eventjs onUnmounted')
		target.removeEventListener(event, callback)
	})
}