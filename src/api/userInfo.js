import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/userInfo/list',
    method:'get',
    params:params
  })
}

export function createUserInfo(data) {
  return request({
    url:'/userInfo/create',
    method:'post',
    data:data
  })
}

export function deleteUserInfo(id) {
  return request({
    url:'/userInfo/delete/'+id,
    method:'get',
  })
}

export function getUserInfo(id) {
  return request({
    url:'/userInfo/'+id,
    method:'get',
  })
}

export function updateUserInfo(id,data) {
  return request({
    url:'/userInfo/update/'+id,
    method:'post',
    data:data
  })
}

export function updateStatus(data) {
  return request({
    url:'/userInfo/updateStatus',
    method:'post',
    data:data
  })
}

export function batchUpdateStatus(data) {
  return request({
    url:'/userInfo/batchUpdate/status',
    method:'post',
    data:data
  })
}

