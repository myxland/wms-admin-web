import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantMeterReadLogCurrent/list',
    method:'get',
    params:params
  })
}

export function createTenantMeterReadLogCurrent(data) {
  return request({
    url:'/tenantMeterReadLogCurrent/create',
    method:'post',
    data:data
  })
}

export function deleteTenantMeterReadLogCurrent(id) {
  return request({
    url:'/tenantMeterReadLogCurrent/delete/'+id,
    method:'get',
  })
}

export function getTenantMeterReadLogCurrent(id) {
  return request({
    url:'/tenantMeterReadLogCurrent/'+id,
    method:'get',
  })
}

export function updateTenantMeterReadLogCurrent(id,data) {
  return request({
    url:'/tenantMeterReadLogCurrent/update/'+id,
    method:'post',
    data:data
  })
}
