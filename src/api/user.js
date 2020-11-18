import request from "./request";

export const login = (data) => request({
  url: "auth/api/v1/login",
  method: 'post',
  data
})

export const refreshToken = (token) => request({
  url: "auth/api/v1/refreshToken",
  method: 'get',
  params: {
    token
  }
})

// export const login = (data) => {
//   return new Promise((resolve) => {
//     setTimeout(() => { 
//       const res = {
//         username: data.username,
//         token: 'asdfasfasfasfdasdfwefasdfasddfasdf'
//       }
//       resolve(res)
//     }, 1500);
//   })
// }

export const loginOut = () => request({
  url: "api/v1/logout",
  method: 'get',
})