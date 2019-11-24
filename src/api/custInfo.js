import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/custInfo/list',
    method:'get',
    params:params
  })
}

export function createCustInfo(data) {
  return request({
    url:'/custInfo/create',
    method:'post',
    data:data
  })
}

export function deleteCustInfo(id) {
  return request({
    url:'/custInfo/delete/'+id,
    method:'get',
  })
}

export function getCustInfo(id) {
  return request({
    url:'/custInfo/'+id,
    method:'get',
  })
}

export function updateCustInfo(id,data) {
  return request({
    url:'/custInfo/update/'+id,
    method:'post',
    data:data
  })
}
