import axios from 'axios'
import { getToken } from '@/utils/auth'
import { Message } from "element-plus/lib/message";
import NProgress from "nprogress/nprogress";
import store from "@/store"

const request = axios.create({
  baseURL: "",
  timeout: 50000
})

request.interceptors.request.use(
  config => {
    NProgress.start();
    const url = config.url;
    if (getToken() && url.indexOf('refreshToken') == -1) {
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
    let code, msg, config;
    if (error.response) {
      const errResponse = error.response;
      code = errResponse.status;
      msg = errResponse.statusText;
      config = errResponse.config;
    } else {
      config = error.config;
      code = 500;
      msg = "服务错误";
    }
    if (code === 401) {
      // 鉴权失败
      const res = await refreshToken(config)
      return res;
    } else {
      Message({
        message: code + '--' + msg,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)

    }
  }
)

async function refreshToken(config) {
  await store.dispatch('user/refreshToken')
  const token = getToken();
  config.headers['Authorization'] = `Bearer ${token}`

  const res = await axios.request(config)
  return res.data.result
}

export default request