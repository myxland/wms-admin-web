import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantMeterStatus/list',
    method:'get',
    params:params
  })
}

export function createTenantMeterStatus(data) {
  return request({
    url:'/tenantMeterStatus/create',
    method:'post',
    data:data
  })
}

export function deleteTenantMeterStatus(id) {
  return request({
    url:'/tenantMeterStatus/delete/'+id,
    method:'get',
  })
}

export function getTenantMeterStatus(id) {
  return request({
    url:'/tenantMeterStatus/'+id,
    method:'get',
  })
}

export function updateTenantMeterStatus(id,data) {
  return request({
    url:'/tenantMeterStatus/update/'+id,
    method:'post',
    data:data
  })
}
