import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantSystem/list',
    method:'get',
    params:params
  })
}

export function createTenantSystem(data) {
  return request({
    url:'/tenantSystem/create',
    method:'post',
    data:data
  })
}

export function deleteTenantSystem(id) {
  return request({
    url:'/tenantSystem/delete/'+id,
    method:'get',
  })
}

export function getTenantSystem(id) {
  return request({
    url:'/tenantSystem/'+id,
    method:'get',
  })
}

export function updateTenantSystem(id,data) {
  return request({
    url:'/tenantSystem/update/'+id,
    method:'post',
    data:data
  })
}

export function updateSysStatus(data) {
  return request({
    url:'/tenantSystem/update/sysStatus',
    method:'post',
    data:data
  })
}
