import request from '/@/utils/request'

enum Api {
  list = '/homework/list',
  done = '/homework/done/list'
}
/**
 * 作业列表
 * @param params
 * @returns
 */
export const getHomeworkList = params => {
  return request.post(Api.list, params)
}
/**
 * 已完成列表
 * @param params 
 * @returns 
 */
export const getDoneList = params => {
  return request.post(Api.done, params)
}
