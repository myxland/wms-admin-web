import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantRoleMenu/list',
    method:'get',
    params:params
  })
}

export function createTenantRoleMenu(data) {
  return request({
    url:'/tenantRoleMenu/create',
    method:'post',
    data:data
  })
}

export function deleteTenantRoleMenu(id) {
  return request({
    url:'/tenantRoleMenu/delete/'+id,
    method:'get',
  })
}

export function getTenantRoleMenu(id) {
  return request({
    url:'/tenantRoleMenu/'+id,
    method:'get',
  })
}

export function updateTenantRoleMenu(id,data) {
  return request({
    url:'/tenantRoleMenu/update/'+id,
    method:'post',
    data:data
  })
}
