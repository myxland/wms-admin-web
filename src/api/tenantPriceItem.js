import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantPriceItem/list',
    method:'get',
    params:params
  })
}

export function createTenantPriceItem(data) {
  return request({
    url:'/tenantPriceItem/create',
    method:'post',
    data:data
  })
}

export function deleteTenantPriceItem(id) {
  return request({
    url:'/tenantPriceItem/delete/'+id,
    method:'get',
  })
}

export function getTenantPriceItem(id) {
  return request({
    url:'/tenantPriceItem/'+id,
    method:'get',
  })
}

export function updateTenantPriceItem(id,data) {
  return request({
    url:'/tenantPriceItem/update/'+id,
    method:'post',
    data:data
  })
}
