import request from '/@/utils/request'

enum Api {
  list = '/file/list',
  delete = '/file/delete',
  download = '/download/add'
}

/**
 * 列表
 * @param params
 * @returns
 */
export const getFileList = params => {
  return request.post(Api.list, params)
}
/**
 * 删除资料
 * @param params
 * @returns
 */
export const deleteFile = params => {
  return request.post(Api.delete, params)
}
/**
 * 下载
 * @param params
 * @returns
 */
export const downloadFile = params => {
  return request.post(Api.download, params)
}
