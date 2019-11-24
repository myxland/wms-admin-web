import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/employee/list',
    method:'get',
    params:params
  })
}

export function createEmployee(data) {
  return request({
    url:'/employee/create',
    method:'post',
    data:data
  })
}

export function deleteEmployee(id) {
  return request({
    url:'/employee/delete/'+id,
    method:'get',
  })
}

export function getEmployee(id) {
  return request({
    url:'/employee/'+id,
    method:'get',
  })
}

export function updateEmployee(id,data) {
  return request({
    url:'/employee/update/'+id,
    method:'post',
    data:data
  })
}

