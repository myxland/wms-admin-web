import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantCustomerMeterInstall/list',
    method:'get',
    params:params
  })
}

export function createTenantCustomerMeterInstall(data) {
  return request({
    url:'/tenantCustomerMeterInstall/create',
    method:'post',
    data:data
  })
}

export function deleteTenantCustomerMeterInstall(id) {
  return request({
    url:'/tenantCustomerMeterInstall/delete/'+id,
    method:'get',
  })
}

export function getTenantCustomerMeterInstall(id) {
  return request({
    url:'/tenantCustomerMeterInstall/'+id,
    method:'get',
  })
}

export function updateTenantCustomerMeterInstall(id,data) {
  return request({
    url:'/tenantCustomerMeterInstall/update/'+id,
    method:'post',
    data:data
  })
}
