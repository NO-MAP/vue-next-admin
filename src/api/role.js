import request from "./request";

export const getRolesPage = (params) => request({
  url: '/api/system/v1/sysRole/page',
  method: 'get',
  params
})