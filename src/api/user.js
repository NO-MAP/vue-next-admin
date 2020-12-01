import request from "./request";

export const getUserPage = (params) => request({
  url: '/api/system/v1/sysUser/page',
  method: 'get',
  params
})

export const addUser = (data) => request({
  url: '/api/system/v1/sysUser',
  method: 'post',
  data
})

export const editUser = (data) => request({
  url: '/api/system/v1/sysUser',
  method: 'put',
  data
})

export const delUser = (id) => request({
  url: `/api/system/v1/sysUser/${id}`,
  method: 'delete'
})

export const changePassword = (data) => request({
  url: '/api/system/v1/sysUser/changePassword',
  method: 'put',
  data
})