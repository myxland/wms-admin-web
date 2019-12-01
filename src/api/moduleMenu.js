import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/moduleMenu/list',
    method:'get',
    params:params
  })
}

export function createModuleMenu(data) {
  return request({
    url:'/moduleMenu/create',
    method:'post',
    data:data
  })
}

export function deleteModuleMenu(id) {
  return request({
    url:'/moduleMenu/delete/'+id,
    method:'get',
  })
}

export function getModuleMenu(id) {
  return request({
    url:'/moduleMenu/'+id,
    method:'get',
  })
}

export function updateModuleMenu(id,data) {
  return request({
    url:'/moduleMenu/update/'+id,
    method:'post',
    data:data
  })
}

export function updateBasicOn(data) {
  return request({
    url:'/moduleMenu/update/basicOn',
    method:'post',
    data:data
  })
}

export function updateAdvanceOn(data) {
  return request({
    url:'/moduleMenu/update/advanceOn',
    method:'post',
    data:data
  })
}

export function updateUltimateOn(data) {
  return request({
    url:'/moduleMenu/update/ultimateOn',
    method:'post',
    data:data
  })
}
