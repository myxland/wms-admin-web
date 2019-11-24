import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/devRecList/list',
    method:'get',
    params:params
  })
}

export function createDevRecList(data) {
  return request({
    url:'/devRecList/create',
    method:'post',
    data:data
  })
}

export function deleteDevRecList(id) {
  return request({
    url:'/devRecList/delete/'+id,
    method:'get',
  })
}

export function getDevRecList(id) {
  return request({
    url:'/devRecList/'+id,
    method:'get',
  })
}

export function updateDevRecList(id,data) {
  return request({
    url:'/devRecList/update/'+id,
    method:'post',
    data:data
  })
}
