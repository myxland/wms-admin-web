import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/devReadCurr/list',
    method:'get',
    params:params
  })
}

export function createDevReadCurr(data) {
  return request({
    url:'/devReadCurr/create',
    method:'post',
    data:data
  })
}

export function deleteDevReadCurr(id) {
  return request({
    url:'/devReadCurr/delete/'+id,
    method:'get',
  })
}

export function getDevReadCurr(id) {
  return request({
    url:'/devReadCurr/'+id,
    method:'get',
  })
}

export function updateDevReadCurr(id,data) {
  return request({
    url:'/devReadCurr/update/'+id,
    method:'post',
    data:data
  })
}
