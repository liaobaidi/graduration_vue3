import request from '/@/utils/request'

enum Api {
  upload = '/upload/video',
  create = '/video/addOrUpdate',
  uploadPic = '/upload/image',
  detail = '/video/info'
}
/**
 * 视频上传
 * @param params
 * @returns
 */
export const uploadVideo = params => {
  return request({
    url: Api.upload,
    method: 'POST',
    data: params,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
/**
 * 创建视频
 * @param params
 * @returns
 */
export const createVideo = params => {
  return request.post(Api.create, params)
}
/**
 * 上传图片
 * @param params
 * @returns
 */
export const uploadPicture = params => {
  return request({
    url: Api.uploadPic,
    method: 'POST',
    data: params,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
/**
 * 获取详情
 * @param params
 * @returns
 */
export const getVideoInfo = params => {
  return request.post(Api.detail, params)
}
