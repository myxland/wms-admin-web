import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/systemDesign/list',
    method:'get',
    params:params
  })
}

export function createSystemDesign(data) {
  return request({
    url:'/systemDesign/create',
    method:'post',
    data:data
  })
}

export function deleteSystemDesign(id) {
  return request({
    url:'/systemDesign/delete/'+id,
    method:'get',
  })
}

export function getSystemDesign(id) {
  return request({
    url:'/systemDesign/'+id,
    method:'get',
  })
}

export function updateSystemDesign(id,data) {
  return request({
    url:'/systemDesign/update/'+id,
    method:'post',
    data:data
  })
}

export function updateBasicOn(data) {
  return request({
    url:'/systemDesign/update/basicOn',
    method:'post',
    data:data
  })
}

export function updateAdvanceOn(data) {
  return request({
    url:'/systemDesign/update/advanceOn',
    method:'post',
    data:data
  })
}

export function updateUltimateOn(data) {
  return request({
    url:'/systemDesign/update/ultimateOn',
    method:'post',
    data:data
  })
}

export function updateModuleReleaseOn(data) {
  return request({
    url:'/systemDesign/update/moduleReleaseOn',
    method:'post',
    data:data
  })
}
