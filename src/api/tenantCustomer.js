import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantCustomer/list',
    method:'get',
    params:params
  })
}

export function createTenantCustomer(data) {
  return request({
    url:'/tenantCustomer/create',
    method:'post',
    data:data
  })
}

export function deleteTenantCustomer(id) {
  return request({
    url:'/tenantCustomer/delete/'+id,
    method:'get',
  })
}

export function getTenantCustomer(id) {
  return request({
    url:'/tenantCustomer/'+id,
    method:'get',
  })
}

export function updateTenantCustomer(id,data) {
  return request({
    url:'/tenantCustomer/update/'+id,
    method:'post',
    data:data
  })
}
