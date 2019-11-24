import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantInfo/list',
    method:'get',
    params:params
  })
}

export function createTenantInfo(data) {
  return request({
    url:'/tenantInfo/create',
    method:'post',
    data:data
  })
}

export function deleteTenantInfo(id) {
  return request({
    url:'/tenantInfo/delete/'+id,
    method:'get',
  })
}

export function getTenantInfo(id) {
  return request({
    url:'/tenantInfo/'+id,
    method:'get',
  })
}

export function updateTenantInfo(id,data) {
  return request({
    url:'/tenantInfo/update/'+id,
    method:'post',
    data:data
  })
}

export function updatePartChargeOn(data) {
  return request({
    url:'/tenantInfo/updatePartChargeOn',
    method:'post',
    data:data
  })
}

export function updateFineOn(data) {
  return request({
    url:'/tenantInfo/updateFineOn',
    method:'post',
    data:data
  })
}

