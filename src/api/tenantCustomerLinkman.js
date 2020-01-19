import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantCustomerLinkman/list',
    method:'get',
    params:params
  })
}

export function createTenantCustomerLinkman(data) {
  return request({
    url:'/tenantCustomerLinkman/create',
    method:'post',
    data:data
  })
}

export function deleteTenantCustomerLinkman(id) {
  return request({
    url:'/tenantCustomerLinkman/delete/'+id,
    method:'get',
  })
}

export function getTenantCustomerLinkman(id) {
  return request({
    url:'/tenantCustomerLinkman/'+id,
    method:'get',
  })
}

export function updateTenantCustomerLinkman(id,data) {
  return request({
    url:'/tenantCustomerLinkman/update/'+id,
    method:'post',
    data:data
  })
}
