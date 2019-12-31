import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantConsumptionBill/list',
    method:'get',
    params:params
  })
}

export function createTenantConsumptionBill(data) {
  return request({
    url:'/tenantConsumptionBill/create',
    method:'post',
    data:data
  })
}

export function createTenantConsumptionBillByTenantConsume(data) {
  return request({
    url:'/tenantConsumptionBill/createByTenantConsume',
    method:'post',
    data:data
  })
}

export function deleteTenantConsumptionBill(id) {
  return request({
    url:'/tenantConsumptionBill/delete/'+id,
    method:'get',
  })
}

export function getTenantConsumptionBill(id) {
  return request({
    url:'/tenantConsumptionBill/'+id,
    method:'get',
  })
}

export function updateTenantConsumptionBill(id,data) {
  return request({
    url:'/tenantConsumptionBill/update/'+id,
    method:'post',
    data:data
  })
}
