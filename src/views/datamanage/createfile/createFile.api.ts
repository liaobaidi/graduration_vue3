import request from '/@/utils/request'

enum Api {
  add = '/file/addOrUpdate',
  detail = '/file/info',
  upload = '/upload/protocol'
}

/**
 * 详情
 * @param params
 * @returns
 */
export const getFileDetail = params => {
  return request.post(Api.detail, params)
}
/**
 * 新增或修改
 * @param params
 * @returns
 */
export const addOrUpdate = params => {
  return request.post(Api.add, params)
}
/**
 * 上传附件
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
