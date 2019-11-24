import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantWaterType/list',
    method:'get',
    params:params
  })
}

export function createTenantWaterType(data) {
  return request({
    url:'/tenantWaterType/create',
    method:'post',
    data:data
  })
}

export function deleteTenantWaterType(id) {
  return request({
    url:'/tenantWaterType/delete/'+id,
    method:'get',
  })
}

export function getTenantWaterType(id) {
  return request({
    url:'/tenantWaterType/'+id,
    method:'get',
  })
}

export function updateTenantWaterType(id,data) {
  return request({
    url:'/tenantWaterType/update/'+id,
    method:'post',
    data:data
  })
}
