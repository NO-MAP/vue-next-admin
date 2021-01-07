import axios from 'axios'
import { getToken } from '@/utils/auth'
import { ElMessage } from "element-plus";
import NProgress from "nprogress/nprogress";
import store from "@/store"
import router from '@/router';
import Message from 'element-plus/lib/el-message';

const request = axios.create({
  baseURL: "http://localhost:8000",
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
    console.log(response)
    if (response.status !== 200 && response.status !== 201) {
      ElMessage({
        message: response.data.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      NProgress.done();
      return Promise.reject(new Error(response.message || 'Error'))
    } else {
      NProgress.done();
      return response.data;
    }
  },
  error => {
    console.log(error)
    NProgress.done();
    let code, msg;
    if (error.response) {
      console.log(error.response.data)
      const errResponse = error.response.data;
      code = errResponse.statusCode;
      msg = errResponse.message;
    } else {
      code = 500;
      msg = "服务错误";
    }
    if (code === 401) {
      // 鉴权失败
      store.commit("user/CLEAR_USERINFO");
      Message.warning("登录状态失效，请重新登录")
      router.replace({
        name: 'Login'
      })
    } else {
      ElMessage({
        message: code + ' | ' + msg,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)

    }
  }
)


export default request