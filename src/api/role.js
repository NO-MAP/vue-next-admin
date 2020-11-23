import request from "./request";

export const getRolesPage = (params) => request({
  url: '/api/system/v1/sysRole/page',
  method: 'get',
  params
})

export const addRole = (data) => request({
  url: '/api/system/v1/sysRole',
  method: 'post',
  data
})

export const editRole = (data) => request({
  url: '/api/system/v1/sysRole',
  method: 'put',
  data
})

export const delRole = (id) => request({
  url: `/api/system/v1/sysRole/${id}`,
  method: 'delete',
})