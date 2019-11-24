import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/dept/list',
    method:'get',
    params:params
  })
}

export function createDept(data) {
  return request({
    url:'/dept/create',
    method:'post',
    data:data
  })
}

export function deleteDept(id) {
  return request({
    url:'/dept/delete/'+id,
    method:'get',
  })
}

export function getDept(id) {
  return request({
    url:'/dept/'+id,
    method:'get',
  })
}

export function updateDept(id,data) {
  return request({
    url:'/dept/update/'+id,
    method:'post',
    data:data
  })
}

