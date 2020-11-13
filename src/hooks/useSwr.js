import { ref } from 'vue'

/**
 * 
 * @param {api方法} f 
 */
function useSwr(f) {
  const result = ref(null)
  const loading = ref(true)
  const loaded = ref(false)
  const error = ref(null)

  f.then((res) => {
    loading.value = false
    loaded.value = true
    result.value = res.data
  }).catch(e => {
    error.value = e
    loading.value = false
  })
  return {
    result,
    loading,
    loaded,
    error
  }

}

export default useSwr