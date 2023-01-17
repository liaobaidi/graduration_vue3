import request from '/@/utils/request'

enum Api {
  list = '/appoint/list/page',
  cancel = '/cancel/appointlist',
  delete = '/appoint/delete'
}
/**
 * 列表
 * @param params
 * @returns
 */
export const getAppointList = params => {
  return request.post(Api.list, params)
}
/**
 * 取消预约
 * @param params
 * @returns
 */
export const cancelAppoint = params => {
  return request.post(Api.cancel, params)
}
/**
 * 删除
 * @param params 
 * @returns 
 */
export const appointDelete = params => {
  return request.post(Api.delete, params)
}
