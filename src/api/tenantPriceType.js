import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantPriceType/list',
    method:'get',
    params:params
  })
}

export function createTenantPriceType(data) {
  return request({
    url:'/tenantPriceType/create',
    method:'post',
    data:data
  })
}

export function deleteTenantPriceType(id) {
  return request({
    url:'/tenantPriceType/delete/'+id,
    method:'get',
  })
}

export function getTenantPriceType(id) {
  return request({
    url:'/tenantPriceType/'+id,
    method:'get',
  })
}

export function updateTenantPriceType(id,data) {
  return request({
    url:'/tenantPriceType/update/'+id,
    method:'post',
    data:data
  })
}
