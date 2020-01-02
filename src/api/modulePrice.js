import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/modulePrice/list',
    method:'get',
    params:params
  })
}

export function createModulePrice(data) {
  return request({
    url:'/modulePrice/create',
    method:'post',
    data:data
  })
}

export function deleteModulePrice(id) {
  return request({
    url:'/modulePrice/delete/'+id,
    method:'get',
  })
}

export function getModulePrice(id) {
  return request({
    url:'/modulePrice/'+id,
    method:'get',
  })
}

export function updateModulePrice(id,data) {
  return request({
    url:'/modulePrice/update/'+id,
    method:'post',
    data:data
  })
}
