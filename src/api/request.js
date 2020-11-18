import axios from 'axios'
import { getToken } from '@/utils/auth'
import { Message } from "element-plus/lib/message";
import NProgress from "nprogress/nprogress";
import config from "@/config"
import { useStore } from 'vuex';

const request = axios.create({
  baseURL: config.baseUrl,
  timeout: 30000
})

request.interceptors.request.use(
  config => {
    NProgress.start();

    if (getToken()) {
      config.headers['Authorization'] = `Bearer ${getToken()}`;
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      NProgress.done();
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      NProgress.done();
      return res.result;
    }
  },
  async error => {
    NProgress.done();
    const errorRES = error.response;
    const { config, status, statusText } = errorRES;
    if (status === 401) {
      // 鉴权失败
      const res = await refreshToken(config)
      console.log("重新请求 结果", res)
      return res;
    } else {
      Message({
        message: status + '--' + statusText,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)

    }
  }
)

async function refreshToken(config) {
  const store = useStore();
  await store.dispatch('user/refreshToken')
  const token = getToken();
  config.headers['Authorization'] = `Bearer ${token}`

  const res = await axios.request(config)
  return res
}

export default request