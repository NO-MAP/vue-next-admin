import request from "./request";

export const getRolesPage = (params) => request({
  url: '/api/v1/roles/page',
  method: 'get',
  params
})

export const getRolesList = () => request({
  url: '/api/v1/roles/list',
  method: 'get'
})

export const getRole = (id) => request({
  url: `/api/v1/roles/${id}`,
  method: 'get',
})

export const addRole = (data) => request({
  url: '/api/v1/roles',
  method: 'post',
  data
})

export const editRole = (data) => request({
  url: '/api/v1/roles',
  method: 'put',
  data
})

export const delRole = (id) => request({
  url: `/api/v1/roles/${id}`,
  method: 'delete',
})