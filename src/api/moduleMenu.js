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

export function updateBasicEditionOn(data) {
  return request({
    url:'/moduleMenu/update/basicEditionOn',
    method:'post',
    data:data
  })
}

export function updateAdvanceEditionOn(data) {
  return request({
    url:'/moduleMenu/update/advanceEditionOn',
    method:'post',
    data:data
  })
}

export function updateUltimateEditionOn(data) {
  return request({
    url:'/moduleMenu/update/ultimateEditionOn',
    method:'post',
    data:data
  })
}
