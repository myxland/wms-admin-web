import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantPriceStep/list',
    method:'get',
    params:params
  })
}

export function createTenantPriceStep(data) {
  return request({
    url:'/tenantPriceStep/create',
    method:'post',
    data:data
  })
}

export function deleteTenantPriceStep(id) {
  return request({
    url:'/tenantPriceStep/delete/'+id,
    method:'get',
  })
}

export function getTenantPriceStep(id) {
  return request({
    url:'/tenantPriceStep/'+id,
    method:'get',
  })
}

export function updateTenantPriceStep(id,data) {
  return request({
    url:'/tenantPriceStep/update/'+id,
    method:'post',
    data:data
  })
}
