import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/tenantEmployeeRole/list',
    method:'get',
    params:params
  })
}

export function createTenantEmployeeRole(data) {
  return request({
    url:'/tenantEmployeeRole/create',
    method:'post',
    data:data
  })
}

export function createBatchTenantEmployeeRole(data) {
  return request({
    url:'/tenantEmployeeRole/createBatch',
    method:'post',
    data:data
  })
}

export function createBatchTenantEmployeeRoleByEmpId(empId,data) {
  return request({
    url:'/tenantEmployeeRole/createBatch/employee/'+empId,
    method:'post',
    data:data
  })
}

export function createBatchTenantEmployeeRoleByRoleId(roleId,data) {
  return request({
    url:'/tenantEmployeeRole/createBatch/role/'+roleId,
    method:'post',
    data:data
  })
}

export function deleteTenantEmployeeRole(id) {
  return request({
    url:'/tenantEmployeeRole/delete/'+id,
    method:'get',
  })
}

export function getTenantEmployeeRole(id) {
  return request({
    url:'/tenantEmployeeRole/'+id,
    method:'get',
  })
}

export function updateTenantEmployeeRole(id,data) {
  return request({
    url:'/tenantEmployeeRole/update/'+id,
    method:'post',
    data:data
  })
}
