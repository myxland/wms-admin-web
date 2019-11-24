import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantBill/list',
    method:'get',
    params:params
  })
}

export function createTenantBill(data) {
  return request({
    url:'/tenantBill/create',
    method:'post',
    data:data
  })
}

export function deleteTenantBill(id) {
  return request({
    url:'/tenantBill/delete/'+id,
    method:'get',
  })
}

export function getTenantBill(id) {
  return request({
    url:'/tenantBill/'+id,
    method:'get',
  })
}

export function updateTenantBill(id,data) {
  return request({
    url:'/tenantBill/update/'+id,
    method:'post',
    data:data
  })
}
