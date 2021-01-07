import request from "./request";

export const getUserPage = (params) => request({
  url: '/api/v1/users/page',
  method: 'get',
  params
})

export const addUser = (data) => request({
  url: '/api/v1/users',
  method: 'post',
  data
})

export const editUser = (data) => request({
  url: '/api/v1/users',
  method: 'put',
  data
})

export const delUser = (id) => request({
  url: `/api/v1/users/${id}`,
  method: 'delete'
})

export const changePassword = (data) => request({
  url: '/api/v1/users/changePassword',
  method: 'put',
  data
})