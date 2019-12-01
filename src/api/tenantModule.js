import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantModule/list',
    method:'get',
    params:params
  })
}

export function createTenantModule(data) {
  return request({
    url:'/tenantModule/create',
    method:'post',
    data:data
  })
}

export function deleteTenantModule(id) {
  return request({
    url:'/tenantModule/delete/'+id,
    method:'get',
  })
}

export function getTenantModule(id) {
  return request({
    url:'/tenantModule/'+id,
    method:'get',
  })
}

export function updateTenantModule(id,data) {
  return request({
    url:'/tenantModule/update/'+id,
    method:'post',
    data:data
  })
}
