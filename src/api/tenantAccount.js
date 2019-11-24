import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantAccount/list',
    method:'get',
    params:params
  })
}

export function createTenantAccount(data) {
  return request({
    url:'/tenantAccount/create',
    method:'post',
    data:data
  })
}

export function deleteTenantAccount(id) {
  return request({
    url:'/tenantAccount/delete/'+id,
    method:'get',
  })
}

export function getTenantAccount(id) {
  return request({
    url:'/tenantAccount/'+id,
    method:'get',
  })
}

export function updateTenantAccount(id,data) {
  return request({
    url:'/tenantAccount/update/'+id,
    method:'post',
    data:data
  })
}
