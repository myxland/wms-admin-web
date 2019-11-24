import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/custInfoChange/list',
    method:'get',
    params:params
  })
}

export function createCustInfoChange(data) {
  return request({
    url:'/custInfoChange/create',
    method:'post',
    data:data
  })
}

export function deleteCustInfoChange(id) {
  return request({
    url:'/custInfoChange/delete/'+id,
    method:'get',
  })
}

export function getCustInfoChange(id) {
  return request({
    url:'/custInfoChange/'+id,
    method:'get',
  })
}

export function updateCustInfoChange(id,data) {
  return request({
    url:'/custInfoChange/update/'+id,
    method:'post',
    data:data
  })
}
