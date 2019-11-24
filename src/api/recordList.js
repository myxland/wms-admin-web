import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/recordList/list',
    method:'get',
    params:params
  })
}

export function createRecordList(data) {
  return request({
    url:'/recordList/create',
    method:'post',
    data:data
  })
}

export function deleteRecordList(id) {
  return request({
    url:'/recordList/delete/'+id,
    method:'get',
  })
}

export function getRecordList(id) {
  return request({
    url:'/recordList/'+id,
    method:'get',
  })
}

export function updateRecordList(id,data) {
  return request({
    url:'/recordList/update/'+id,
    method:'post',
    data:data
  })
}

