import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/moduleInfo/list',
    method:'get',
    params:params
  })
}

export function createModuleInfo(data) {
  return request({
    url:'/moduleInfo/create',
    method:'post',
    data:data
  })
}

export function deleteModuleInfo(id) {
  return request({
    url:'/moduleInfo/delete/'+id,
    method:'get',
  })
}

export function getModuleInfo(id) {
  return request({
    url:'/moduleInfo/'+id,
    method:'get',
  })
}

export function updateModuleInfo(id,data) {
  return request({
    url:'/moduleInfo/update/'+id,
    method:'post',
    data:data
  })
}

export function updateBasicEditionOn(data) {
  return request({
    url:'/moduleInfo/update/basicEditionOn',
    method:'post',
    data:data
  })
}

export function updateAdvanceEditionOn(data) {
  return request({
    url:'/moduleInfo/update/advanceEditionOn',
    method:'post',
    data:data
  })
}

export function updateUltimateEditionOn(data) {
  return request({
    url:'/moduleInfo/update/ultimateEditionOn',
    method:'post',
    data:data
  })
}

export function updateModuleOn(data) {
  return request({
    url:'/moduleInfo/update/moduleOn',
    method:'post',
    data:data
  })
}
