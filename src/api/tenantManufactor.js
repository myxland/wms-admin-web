import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantManufactor/list',
    method:'get',
    params:params
  })
}

export function createTenantManufactor(data) {
  return request({
    url:'/tenantManufactor/create',
    method:'post',
    data:data
  })
}

export function deleteTenantManufactor(id) {
  return request({
    url:'/tenantManufactor/delete/'+id,
    method:'get',
  })
}

export function getTenantManufactor(id) {
  return request({
    url:'/tenantManufactor/'+id,
    method:'get',
  })
}

export function updateTenantManufactor(id,data) {
  return request({
    url:'/tenantManufactor/update/'+id,
    method:'post',
    data:data
  })
}
