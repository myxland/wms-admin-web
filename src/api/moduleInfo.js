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

export function updateBasicOn(data) {
  return request({
    url:'/moduleInfo/update/basicOn',
    method:'post',
    data:data
  })
}

export function updateAdvanceOn(data) {
  return request({
    url:'/moduleInfo/update/advanceOn',
    method:'post',
    data:data
  })
}

export function updateUltimateOn(data) {
  return request({
    url:'/moduleInfo/update/ultimateOn',
    method:'post',
    data:data
  })
}

export function updateModuleReleaseOn(data) {
  return request({
    url:'/moduleInfo/update/moduleReleaseOn',
    method:'post',
    data:data
  })
}
