import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantCustType/list',
    method:'get',
    params:params
  })
}

export function createTenantCustType(data) {
  return request({
    url:'/tenantCustType/create',
    method:'post',
    data:data
  })
}

export function deleteTenantCustType(id) {
  return request({
    url:'/tenantCustType/delete/'+id,
    method:'get',
  })
}

export function getTenantCustType(id) {
  return request({
    url:'/tenantCustType/'+id,
    method:'get',
  })
}

export function updateTenantCustType(id,data) {
  return request({
    url:'/tenantCustType/update/'+id,
    method:'post',
    data:data
  })
}
