import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantSms/list',
    method:'get',
    params:params
  })
}

export function createTenantSms(data) {
  return request({
    url:'/tenantSms/create',
    method:'post',
    data:data
  })
}

export function deleteTenantSms(id) {
  return request({
    url:'/tenantSms/delete/'+id,
    method:'get',
  })
}

export function getTenantSms(id) {
  return request({
    url:'/tenantSms/'+id,
    method:'get',
  })
}

export function updateTenantSms(id,data) {
  return request({
    url:'/tenantSms/update/'+id,
    method:'post',
    data:data
  })
}

export function updateSmsReadSendOn(data) {
  return request({
    url:'/tenantSms/update/smsReadSendOn',
    method:'post',
    data:data
  })
}

export function updateSmsChargeSendOn(data) {
  return request({
    url:'/tenantSms/update/smsChargeSendOn',
    method:'post',
    data:data
  })
}

export function updateSmsQfSendOn(data) {
  return request({
    url:'/tenantSms/update/smsQfSendOn',
    method:'post',
    data:data
  })
}