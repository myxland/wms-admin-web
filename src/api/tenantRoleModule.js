import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantRoleModule/list',
    method:'get',
    params:params
  })
}

export function createTenantRoleModule(data) {
  return request({
    url:'/tenantRoleModule/create',
    method:'post',
    data:data
  })
}

export function deleteTenantRoleModule(id) {
  return request({
    url:'/tenantRoleModule/delete/'+id,
    method:'get',
  })
}

export function getTenantRoleModule(id) {
  return request({
    url:'/tenantRoleModule/'+id,
    method:'get',
  })
}

export function updateTenantRoleModule(id,data) {
  return request({
    url:'/tenantRoleModule/update/'+id,
    method:'post',
    data:data
  })
}
