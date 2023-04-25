import { ref, onMounted, onUnmounted } from 'vue'
import { useEventListener } from './event.js'
export function useMouse () {
	const x = ref(0)
	const y = ref(0)
	useEventListener(window, 'mousemove', e => {
		x.value = e.clientX
		y.value = e.clientY
	})
	return { x, y }
}