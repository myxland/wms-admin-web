import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantInvoice/list',
    method:'get',
    params:params
  })
}

export function createTenantInvoice(data) {
  return request({
    url:'/tenantInvoice/create',
    method:'post',
    data:data
  })
}

export function deleteTenantInvoice(id) {
  return request({
    url:'/tenantInvoice/delete/'+id,
    method:'get',
  })
}

export function getTenantInvoice(id) {
  return request({
    url:'/tenantInvoice/'+id,
    method:'get',
  })
}

export function getTenantInvoiceByTenantId(tenantId) {
  return request({
    url:'/tenantInvoice/tenantId/'+tenantId,
    method:'get',
  })
}

export function updateTenantInvoice(id,data) {
  return request({
    url:'/tenantInvoice/update/'+id,
    method:'post',
    data:data
  })
}
