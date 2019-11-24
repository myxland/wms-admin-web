import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/iotDeviceDesign/list',
    method:'get',
    params:params
  })
}

export function createIotDeviceDesign(data) {
  return request({
    url:'/iotDeviceDesign/create',
    method:'post',
    data:data
  })
}

export function deleteIotDeviceDesign(id) {
  return request({
    url:'/iotDeviceDesign/delete/'+id,
    method:'get',
  })
}

export function getIotDeviceDesign(id) {
  return request({
    url:'/iotDeviceDesign/'+id,
    method:'get',
  })
}

export function updateIotDeviceDesign(id,data) {
  return request({
    url:'/iotDeviceDesign/update/'+id,
    method:'post',
    data:data
  })
}
