import request from '/@/utils/request'

enum Api {
  list = '/user/list',
  export = '/user/export',
  add = '/user/insert',
  import = '/user/import'
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
/**
 * 批量导入
 * @param params 
 * @returns 
 */
export const importUser = params => {
  return request({
    url: Api.import,
    method: 'POST',
    data: params,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
