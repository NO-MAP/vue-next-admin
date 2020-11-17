import request from "./request";

// export const login = (data) => request({
//   url: "api/v1/login",
//   method: 'post',
//   data
// })

export const login = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = {
        username: data.username,
        token: 'asdfasfasfasfdasdfwefasdfasddfasdf'
      }
      resolve(res)
    }, 1500);
  })
}

export const loginOut = () => request({
  url: "api/v1/logout",
  method: 'get',
})