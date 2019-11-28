import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantDept/list',
    method:'get',
    params:params
  })
}

export function createTenantDept(data) {
  return request({
    url:'/tenantDept/create',
    method:'post',
    data:data
  })
}

export function deleteTenantDept(id) {
  return request({
    url:'/tenantDept/delete/'+id,
    method:'get',
  })
}

export function getTenantDept(id) {
  return request({
    url:'/tenantDept/'+id,
    method:'get',
  })
}

export function updateTenantDept(id,data) {
  return request({
    url:'/tenantDept/update/'+id,
    method:'post',
    data:data
  })
}
