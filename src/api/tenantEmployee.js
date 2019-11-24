import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantEmployee/list',
    method:'get',
    params:params
  })
}

export function createTenantEmployee(data) {
  return request({
    url:'/tenantEmployee/create',
    method:'post',
    data:data
  })
}

export function deleteTenantEmployee(id) {
  return request({
    url:'/tenantEmployee/delete/'+id,
    method:'get',
  })
}

export function getTenantEmployee(id) {
  return request({
    url:'/tenantEmployee/'+id,
    method:'get',
  })
}

export function updateTenantEmployee(id,data) {
  return request({
    url:'/tenantEmployee/update/'+id,
    method:'post',
    data:data
  })
}
