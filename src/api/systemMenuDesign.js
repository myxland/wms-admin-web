import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/systemMenuDesign/list',
    method:'get',
    params:params
  })
}

export function createSystemMenuDesign(data) {
  return request({
    url:'/systemMenuDesign/create',
    method:'post',
    data:data
  })
}

export function deleteSystemMenuDesign(id) {
  return request({
    url:'/systemMenuDesign/delete/'+id,
    method:'get',
  })
}

export function getSystemMenuDesign(id) {
  return request({
    url:'/systemMenuDesign/'+id,
    method:'get',
  })
}

export function updateSystemMenuDesign(id,data) {
  return request({
    url:'/systemMenuDesign/update/'+id,
    method:'post',
    data:data
  })
}

export function updateBasicOn(data) {
  return request({
    url:'/systemMenuDesign/update/basicOn',
    method:'post',
    data:data
  })
}

export function updateAdvanceOn(data) {
  return request({
    url:'/systemMenuDesign/update/advanceOn',
    method:'post',
    data:data
  })
}

export function updateUltimateOn(data) {
  return request({
    url:'/systemMenuDesign/update/ultimateOn',
    method:'post',
    data:data
  })
}
