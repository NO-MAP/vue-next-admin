import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import NProgress from "nprogress/nprogress";
import config from '@/config';


const request = axios.create({
  baseURL: config.baseUrl,
  timeout: 30000
})

request.interceptors.request.use(
  config => {
    NProgress.start();

    if (getToken()) {
      config.headers['token'] = getToken();
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
      return res.data;
    }
  },
  error => {
    console.log('err---' + error) // for debug
    NProgress.done();
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default request