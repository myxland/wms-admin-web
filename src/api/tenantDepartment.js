import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantDepartment/list',
    method:'get',
    params:params
  })
}

export function createTenantDepartment(data) {
  return request({
    url:'/tenantDepartment/create',
    method:'post',
    data:data
  })
}

export function deleteTenantDepartment(id) {
  return request({
    url:'/tenantDepartment/delete/'+id,
    method:'get',
  })
}

export function getTenantDepartment(id) {
  return request({
    url:'/tenantDepartment/'+id,
    method:'get',
  })
}

export function updateTenantDepartment(id,data) {
  return request({
    url:'/tenantDepartment/update/'+id,
    method:'post',
    data:data
  })
}
