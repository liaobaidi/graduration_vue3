import request from '/@/utils/request'

enum Api {
  list = '/experiment/list',
  appoint = '/experiment/appoint',
  appointList = '/appoint/list',
  cancel = '/cancel/appoint'
}
/**
 * 实验室列表
 * @param params
 * @returns
 */
export const getExprimentList = params => {
  return request.post(Api.list, params)
}
/**
 * 预约实验室
 * @param params
 * @returns
 */
export const appointExperiment = params => {
  return request.post(Api.appoint, params)
}
/**
 * 预约列表
 * @returns
 */
export const getAppointList = () => {
  return request.get(Api.appointList)
}
/**
 * 取消预约
 * @param params
 * @returns
 */
export const cancelAppoint = params => {
  return request.post(Api.cancel, params)
}
