import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantCustomerMeterChangeLog/list',
    method:'get',
    params:params
  })
}

export function createTenantCustomerMeterChangeLog(data) {
  return request({
    url:'/tenantCustomerMeterChangeLog/create',
    method:'post',
    data:data
  })
}

export function deleteTenantCustomerMeterChangeLog(id) {
  return request({
    url:'/tenantCustomerMeterChangeLog/delete/'+id,
    method:'get',
  })
}

export function getTenantCustomerMeterChangeLog(id) {
  return request({
    url:'/tenantCustomerMeterChangeLog/'+id,
    method:'get',
  })
}

export function updateTenantCustomerMeterChangeLog(id,data) {
  return request({
    url:'/tenantCustomerMeterChangeLog/update/'+id,
    method:'post',
    data:data
  })
}
