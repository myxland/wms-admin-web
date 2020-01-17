import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantCaliber/list',
    method:'get',
    params:params
  })
}

export function createTenantCaliber(data) {
  return request({
    url:'/tenantCaliber/create',
    method:'post',
    data:data
  })
}

export function deleteTenantCaliber(id) {
  return request({
    url:'/tenantCaliber/delete/'+id,
    method:'get',
  })
}

export function getTenantCaliber(id) {
  return request({
    url:'/tenantCaliber/'+id,
    method:'get',
  })
}

export function updateTenantCaliber(id,data) {
  return request({
    url:'/tenantCaliber/update/'+id,
    method:'post',
    data:data
  })
}
