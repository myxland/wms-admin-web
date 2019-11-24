import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/custDev/list',
    method:'get',
    params:params
  })
}

export function createCustDev(data) {
  return request({
    url:'/custDev/create',
    method:'post',
    data:data
  })
}

export function deleteCustDev(id) {
  return request({
    url:'/custDev/delete/'+id,
    method:'get',
  })
}

export function getCustDev(id) {
  return request({
    url:'/custDev/'+id,
    method:'get',
  })
}

export function updateCustDev(id,data) {
  return request({
    url:'/custDev/update/'+id,
    method:'post',
    data:data
  })
}
