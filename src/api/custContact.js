import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/custContact/list',
    method:'get',
    params:params
  })
}

export function createCustContact(data) {
  return request({
    url:'/custContact/create',
    method:'post',
    data:data
  })
}

export function deleteCustContact(id) {
  return request({
    url:'/custContact/delete/'+id,
    method:'get',
  })
}

export function getCustContact(id) {
  return request({
    url:'/custContact/'+id,
    method:'get',
  })
}

export function updateCustContact(id,data) {
  return request({
    url:'/custContact/update/'+id,
    method:'post',
    data:data
  })
}
