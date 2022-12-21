import request from '/@/utils/request'

enum Api {
  list = '/user/list'
}
/**
 * 用户列表
 * @param params 
 * @returns 
 */
export const getUserList = params => {
  return request.post(Api.list, params)
}
