import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantMeter/list',
    method:'get',
    params:params
  })
}

export function createTenantMeter(data) {
  return request({
    url:'/tenantMeter/create',
    method:'post',
    data:data
  })
}

export function deleteTenantMeter(id) {
  return request({
    url:'/tenantMeter/delete/'+id,
    method:'get',
  })
}

export function getTenantMeter(id) {
  return request({
    url:'/tenantMeter/'+id,
    method:'get',
  })
}

export function updateTenantMeter(id,data) {
  return request({
    url:'/tenantMeter/update/'+id,
    method:'post',
    data:data
  })
}
