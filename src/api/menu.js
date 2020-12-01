import request from "./request";

export const getMenuTree = () => request({
  url: '/api/system/v1/sysPermission/treeMenu',
  method: 'get'
})

export const addMenu = (data) => request({
  url: '/api/system/v1/sysPermission',
  method: 'post',
  data
})

export const editMenu = (data) => request({
  url: '/api/system/v1/sysPermission',
  method: 'put',
  data
})

export const delMenu = (id) => request({
  url: `/api/system/v1/sysPermission/${id}`,
  method: 'delete'
})