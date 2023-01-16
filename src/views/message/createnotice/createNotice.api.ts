import request from '/@/utils/request'

enum Api {
  upload = '/upload/protocol',
  update = '/notice/updateOrSave'
}
/**
 * 上传
 * @param params
 * @returns
 */
export const uploadProtocol = params => {
  return request({
    url: Api.upload,
    method: 'POST',
    data: params,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
/**
 * 发布公告
 * @param params
 * @returns
 */
export const save = params => {
  return request.post(Api.update, params)
}
