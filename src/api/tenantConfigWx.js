import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantConfigWx/list',
    method:'get',
    params:params
  })
}

export function createTenantConfigWx(data) {
  return request({
    url:'/tenantConfigWx/create',
    method:'post',
    data:data
  })
}

export function deleteTenantConfigWx(id) {
  return request({
    url:'/tenantConfigWx/delete/'+id,
    method:'get',
  })
}

export function getTenantConfigWx(id) {
  return request({
    url:'/tenantConfigWx/'+id,
    method:'get',
  })
}

export function updateTenantConfigWx(id,data) {
  return request({
    url:'/tenantConfigWx/update/'+id,
    method:'post',
    data:data
  })
}
