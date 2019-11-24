import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/systemPrice/list',
    method:'get',
    params:params
  })
}

export function createSystemPrice(data) {
  return request({
    url:'/systemPrice/create',
    method:'post',
    data:data
  })
}

export function deleteSystemPrice(id) {
  return request({
    url:'/systemPrice/delete/'+id,
    method:'get',
  })
}

export function getSystemPrice(id) {
  return request({
    url:'/systemPrice/'+id,
    method:'get',
  })
}

export function updateSystemPrice(id,data) {
  return request({
    url:'/systemPrice/update/'+id,
    method:'post',
    data:data
  })
}
