import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantCustomerType/list',
    method:'get',
    params:params
  })
}

export function createTenantCustomerType(data) {
  return request({
    url:'/tenantCustomerType/create',
    method:'post',
    data:data
  })
}

export function deleteTenantCustomerType(id) {
  return request({
    url:'/tenantCustomerType/delete/'+id,
    method:'get',
  })
}

export function getTenantCustomerType(id) {
  return request({
    url:'/tenantCustomerType/'+id,
    method:'get',
  })
}

export function updateTenantCustomerType(id,data) {
  return request({
    url:'/tenantCustomerType/update/'+id,
    method:'post',
    data:data
  })
}
