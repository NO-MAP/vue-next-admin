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

/**
 * @param {any} defalutValue 默认值 
 */
export const SWR = (defalutValue) => {
  return reactive({
    loading: false,
    result: defalutValue || null,
    error: null
  })
}
