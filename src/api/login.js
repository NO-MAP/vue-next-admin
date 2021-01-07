import request from "./request";
import { routers } from "./temp";

export const login = (data) => request({
  url: "/api/v1/auth/login",
  method: 'post',
  data
})

export const getProfile = () => request({
  url: "/api/v1/auth/profile",
  method: 'get'
})

export const getRouters = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(routers)
    }, 800);
  })
}

export const hello = () => request({
  url: "/api/system/hello",
  method: 'get'
})

export const loginOut = () => request({
  url: "/api/auth/logout",
  method: 'get',
})