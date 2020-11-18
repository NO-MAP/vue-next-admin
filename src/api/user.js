import request from "./request";
import { routers } from "./temp";

export const login = (data) => request({
  url: "api/auth/v1/login",
  method: 'post',
  data
})

export const refreshToken = (token) => request({
  url: "api/auth/v1/refreshToken",
  method: 'get',
  params: {
    token
  }
})

export const getRouters = () => {
  setTimeout(() => {
    return new Promise(resolve => {
      resolve(routers)
    })
  }, 1500);
}

export const hello = () => request({
  url: "api/system/hello",
  method: 'get'
})

export const loginOut = () => request({
  url: "api/auth/logout",
  method: 'get',
})