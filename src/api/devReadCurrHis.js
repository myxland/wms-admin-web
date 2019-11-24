import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/devReadCurrHis/list',
    method:'get',
    params:params
  })
}

export function createDevReadCurrHis(data) {
  return request({
    url:'/devReadCurrHis/create',
    method:'post',
    data:data
  })
}

export function deleteDevReadCurrHis(id) {
  return request({
    url:'/devReadCurrHis/delete/'+id,
    method:'get',
  })
}

export function getDevReadCurrHis(id) {
  return request({
    url:'/devReadCurrHis/'+id,
    method:'get',
  })
}

export function updateDevReadCurrHis(id,data) {
  return request({
    url:'/devReadCurrHis/update/'+id,
    method:'post',
    data:data
  })
}
