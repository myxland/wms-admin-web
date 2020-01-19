import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantReceivable/list',
    method:'get',
    params:params
  })
}

export function createTenantReceivable(data) {
  return request({
    url:'/tenantReceivable/create',
    method:'post',
    data:data
  })
}

export function deleteTenantReceivable(id) {
  return request({
    url:'/tenantReceivable/delete/'+id,
    method:'get',
  })
}

export function getTenantReceivable(id) {
  return request({
    url:'/tenantReceivable/'+id,
    method:'get',
  })
}

export function updateTenantReceivable(id,data) {
  return request({
    url:'/tenantReceivable/update/'+id,
    method:'post',
    data:data
  })
}
