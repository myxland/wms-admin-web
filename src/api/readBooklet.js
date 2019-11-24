import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/readBooklet/list',
    method:'get',
    params:params
  })
}

export function createReadBooklet(data) {
  return request({
    url:'/readBooklet/create',
    method:'post',
    data:data
  })
}

export function deleteReadBooklet(id) {
  return request({
    url:'/readBooklet/delete/'+id,
    method:'get',
  })
}

export function getReadBooklet(id) {
  return request({
    url:'/readBooklet/'+id,
    method:'get',
  })
}

export function updateReadBooklet(id,data) {
  return request({
    url:'/readBooklet/update/'+id,
    method:'post',
    data:data
  })
}
