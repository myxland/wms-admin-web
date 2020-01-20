import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantPayment/list',
    method:'get',
    params:params
  })
}

export function createTenantPayment(data) {
  return request({
    url:'/tenantPayment/create',
    method:'post',
    data:data
  })
}

export function deleteTenantPayment(id) {
  return request({
    url:'/tenantPayment/delete/'+id,
    method:'get',
  })
}

export function getTenantPayment(id) {
  return request({
    url:'/tenantPayment/'+id,
    method:'get',
  })
}

export function updateTenantPayment(id,data) {
  return request({
    url:'/tenantPayment/update/'+id,
    method:'post',
    data:data
  })
}
