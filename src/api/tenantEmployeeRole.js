import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantEmployeeRole/list',
    method:'get',
    params:params
  })
}

export function createTenantEmployeeRole(data) {
  return request({
    url:'/tenantEmployeeRole/create',
    method:'post',
    data:data
  })
}

export function deleteTenantEmployeeRole(id) {
  return request({
    url:'/tenantEmployeeRole/delete/'+id,
    method:'get',
  })
}

export function getTenantEmployeeRole(id) {
  return request({
    url:'/tenantEmployeeRole/'+id,
    method:'get',
  })
}

export function updateTenantEmployeeRole(id,data) {
  return request({
    url:'/tenantEmployeeRole/update/'+id,
    method:'post',
    data:data
  })
}
