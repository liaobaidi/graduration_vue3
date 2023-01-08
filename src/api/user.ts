import request from '/@/utils/request'

enum Api {
  login = '/sys/login',
  logout = '/sys/logout',
  list = '/user/list',
  update = '/sys/update',
  detail = '/user/info',
  save = '/user/saveOrUpdate',
  upload = '/upload/image'
}
/**
 * 用户列表
 * @returns
 */
export const userList = (params: any) => {
  return request.post(Api.list, params)
}
/**
 * 登录
 * @param params
 * @returns
 */
export const user_login = (params: any) => {
  return request.post(Api.login, params)
}
/**
 * 登出
 * @returns
 */
export const user_logout = () => {
  return request.post(Api.logout)
}
/**
 * 修改密码
 * @param params
 * @returns
 */
export const user_update = (params: any) => {
  return request.post(Api.update, params)
}
/**
 * 用户详情
 * @param params
 * @returns
 */
export const user_info = (params: any) => {
  return request.post(Api.detail, params)
}
/**
 * 修改用户信息
 * @param params
 * @returns
 */
export const user_save = (params: any) => {
  return request.post(Api.save, params)
}
/**
 * 上传图片
 * @param params
 * @returns
 */
export const uploadFileImage = (params: any) => {
  return request({
    url: Api.upload,
    method: 'POST',
    data: params,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
