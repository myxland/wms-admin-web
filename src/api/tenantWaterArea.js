import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantWaterArea/list',
    method:'get',
    params:params
  })
}

export function createTenantWaterArea(data) {
  return request({
    url:'/tenantWaterArea/create',
    method:'post',
    data:data
  })
}

export function deleteTenantWaterArea(id) {
  return request({
    url:'/tenantWaterArea/delete/'+id,
    method:'get',
  })
}

export function getTenantWaterArea(id) {
  return request({
    url:'/tenantWaterArea/'+id,
    method:'get',
  })
}

export function updateTenantWaterArea(id,data) {
  return request({
    url:'/tenantWaterArea/update/'+id,
    method:'post',
    data:data
  })
}
