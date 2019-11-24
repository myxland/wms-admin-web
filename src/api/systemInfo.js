import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/systemInfo/list',
    method:'get',
    params:params
  })
}

export function createSystemInfo(data) {
  return request({
    url:'/systemInfo/create',
    method:'post',
    data:data
  })
}

export function deleteSystemInfo(id) {
  return request({
    url:'/systemInfo/delete/'+id,
    method:'get',
  })
}

export function getSystemInfo(id) {
  return request({
    url:'/systemInfo/'+id,
    method:'get',
  })
}

export function updateSystemInfo(id,data) {
  return request({
    url:'/systemInfo/update/'+id,
    method:'post',
    data:data
  })
}

export function updateBasicOn(data) {
  return request({
    url:'/systemInfo/updateBasicOn',
    method:'post',
    data:data
  })
}

export function updateAdvanceOn(data) {
  return request({
    url:'/systemInfo/updateAdvanceOn',
    method:'post',
    data:data
  })
}

export function updateUltimateOn(data) {
  return request({
    url:'/systemInfo/updateUltimateOn',
    method:'post',
    data:data
  })
}

export function updateIssueOn(data) {
  return request({
    url:'/systemInfo/updateIssueOn',
    method:'post',
    data:data
  })
}

export function batchUpdateIssueOn(data) {
  return request({
    url:'/systemInfo/batchUpdate/issueOn',
    method:'post',
    data:data
  })
}

