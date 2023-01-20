import request from '/@/utils/request'

enum Api {
  detail = '/homework/detail',
  upload = '/upload/protocol',
  save = '/homework/saveOrUpdate'
}
/**
 * 作业详情
 * @param params
 * @returns
 */
export const getHomeworkDetail = params => {
  return request.post(Api.detail, params)
}
/**
 * 上传
 * @param params
 * @returns
 */
export const uploadFile = params => {
  return request({
    url: Api.upload,
    method: 'POST',
    data: params,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
/**
 * 发布、修改作业
 * @param params
 * @returns
 */
export const saveOrUpdate = params => {
  return request.post(Api.save, params)
}
