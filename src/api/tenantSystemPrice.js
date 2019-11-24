import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantSystemPrice/list',
    method:'get',
    params:params
  })
}

export function createTenantSystemPrice(data) {
  return request({
    url:'/tenantSystemPrice/create',
    method:'post',
    data:data
  })
}

export function deleteTenantSystemPrice(id) {
  return request({
    url:'/tenantSystemPrice/delete/'+id,
    method:'get',
  })
}

export function getTenantSystemPrice(id) {
  return request({
    url:'/tenantSystemPrice/'+id,
    method:'get',
  })
}

export function updateTenantSystemPrice(id,data) {
  return request({
    url:'/tenantSystemPrice/update/'+id,
    method:'post',
    data:data
  })
}
