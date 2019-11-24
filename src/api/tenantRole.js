import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantRole/list',
    method:'get',
    params:params
  })
}

export function createTenantRole(data) {
  return request({
    url:'/tenantRole/create',
    method:'post',
    data:data
  })
}

export function deleteTenantRole(id) {
  return request({
    url:'/tenantRole/delete/'+id,
    method:'get',
  })
}

export function getTenantRole(id) {
  return request({
    url:'/tenantRole/'+id,
    method:'get',
  })
}

export function updateTenantRole(id,data) {
  return request({
    url:'/tenantRole/update/'+id,
    method:'post',
    data:data
  })
}
