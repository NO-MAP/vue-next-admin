import { reactive } from 'vue'

/**
 * 
 * @param {Function} f 
 */
export const useSWR = async (f, SWR) => {
  if (f && SWR) {
    // console.log(SWR.loading)
    SWR.loading = true;
    // console.log(SWR.loading)
    try {
      SWR.result = await f;
      SWR.success = true;
    } catch (error) {
      SWR.error = error;
      SWR.success = false;
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
    error: null,
    success: false
  })
}
