import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantConfigSms/list',
    method:'get',
    params:params
  })
}

export function createTenantConfigSms(data) {
  return request({
    url:'/tenantConfigSms/create',
    method:'post',
    data:data
  })
}

export function deleteTenantConfigSms(id) {
  return request({
    url:'/tenantConfigSms/delete/'+id,
    method:'get',
  })
}

export function getTenantConfigSms(id) {
  return request({
    url:'/tenantConfigSms/'+id,
    method:'get',
  })
}

export function updateTenantConfigSms(id,data) {
  return request({
    url:'/tenantConfigSms/update/'+id,
    method:'post',
    data:data
  })
}
