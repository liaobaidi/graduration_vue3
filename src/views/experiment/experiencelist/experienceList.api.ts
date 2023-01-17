import request from '/@/utils/request'

enum Api {
  list = '/experience/list',
  publish = '/experience/saveOrUpdate',
  upload = '/upload/protocol'
}
/**
 * 列表
 * @param params
 * @returns
 */
export const getExperienceList = params => {
  return request.post(Api.list, params)
}
/**
 * 发布实验
 * @param params
 * @returns
 */
export const publishExperience = params => {
  return request.post(Api.publish, params)
}
/**
 * 上传
 * @param params
 * @returns
 */
export const uploadFile = params => {
  return request.post(Api.upload, params)
}
