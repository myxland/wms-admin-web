import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantConfig/list',
    method:'get',
    params:params
  })
}

export function createTenantConfig(data) {
  return request({
    url:'/tenantConfig/create',
    method:'post',
    data:data
  })
}

export function deleteTenantConfig(id) {
  return request({
    url:'/tenantConfig/delete/'+id,
    method:'get',
  })
}

export function getTenantConfig(id) {
  return request({
    url:'/tenantConfig/'+id,
    method:'get',
  })
}

export function getTenantConfigByTenantId(tenantId) {
  return request({
    url:'/tenantConfig/tenantId/'+tenantId,
    method:'get',
  })
}

export function updateTenantConfig(id,data) {
  return request({
    url:'/tenantConfig/update/'+id,
    method:'post',
    data:data
  })
}
