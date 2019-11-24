import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantRoleSystem/list',
    method:'get',
    params:params
  })
}

export function createTenantRoleSystem(data) {
  return request({
    url:'/tenantRoleSystem/create',
    method:'post',
    data:data
  })
}

export function deleteTenantRoleSystem(id) {
  return request({
    url:'/tenantRoleSystem/delete/'+id,
    method:'get',
  })
}

export function getTenantRoleSystem(id) {
  return request({
    url:'/tenantRoleSystem/'+id,
    method:'get',
  })
}

export function updateTenantRoleSystem(id,data) {
  return request({
    url:'/tenantRoleSystem/update/'+id,
    method:'post',
    data:data
  })
}
