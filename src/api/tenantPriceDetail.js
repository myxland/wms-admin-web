import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantPriceDetail/list',
    method:'get',
    params:params
  })
}

export function createTenantPriceDetail(data) {
  return request({
    url:'/tenantPriceDetail/create',
    method:'post',
    data:data
  })
}

export function deleteTenantPriceDetail(id) {
  return request({
    url:'/tenantPriceDetail/delete/'+id,
    method:'get',
  })
}

export function getTenantPriceDetail(id) {
  return request({
    url:'/tenantPriceDetail/'+id,
    method:'get',
  })
}

export function updateTenantPriceDetail(id,data) {
  return request({
    url:'/tenantPriceDetail/update/'+id,
    method:'post',
    data:data
  })
}
