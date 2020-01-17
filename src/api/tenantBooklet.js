import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantBooklet/list',
    method:'get',
    params:params
  })
}

export function createTenantBooklet(data) {
  return request({
    url:'/tenantBooklet/create',
    method:'post',
    data:data
  })
}

export function deleteTenantBooklet(id) {
  return request({
    url:'/tenantBooklet/delete/'+id,
    method:'get',
  })
}

export function getTenantBooklet(id) {
  return request({
    url:'/tenantBooklet/'+id,
    method:'get',
  })
}

export function updateTenantBooklet(id,data) {
  return request({
    url:'/tenantBooklet/update/'+id,
    method:'post',
    data:data
  })
}
