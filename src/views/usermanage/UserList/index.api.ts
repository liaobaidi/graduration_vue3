import request from '/@/utils/request'

enum Api {
  list = '/user/list',
  export = '/user/export',
  add = '/user/insert'
}
/**
 * 用户列表
 * @param params
 * @returns
 */
export const getUserList = params => {
  return request.post(Api.list, params)
}
/**
 *
 * @param params
 * @returns
 */
export const exportUserList = params => {
  return request.post(Api.export, params)
}
/**
 * 添加用户
 * @param params
 * @returns
 */
export const insertUser = params => {
  return request.post(Api.add, params)
}
