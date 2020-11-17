import { reactive } from 'vue'

/**
 * 
 * @param {Function} f 
 */
export const useSWR = async (f, SWR) => {
  if (f && SWR) {
    SWR.loading = true;
    try {
      SWR.result = await f;
    } catch (error) {
      SWR.error = error;
    } finally {
      SWR.loading = false;
    }
    return SWR
  }
}

export const SWR = () => {
  return reactive({
    loading: false,
    result: null,
    error: null
  })
}
