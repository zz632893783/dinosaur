import { ref, isRef, unref, watch } from 'vue'

export function useFetch (url) {
	const data = ref(null)
	const error = ref(null)
	function doFetch () {
		console.log(123)
		data.value = null
		error.value = null
		setTimeout(() => {
			const tempUrl = isRef(url) ? url.value : url
			Math.random() < 0.5 ? (data.value = `${tempUrl}: success`) : (error.value = `${tempUrl}: error`)
		}, 200)
	}
	if (isRef(url)) {
		watch(url, doFetch)
	} else {
		doFetch()
	}
	return { data, error }
}