import request from '/@/utils/request'

enum Api {
  list = '/video/list'
}
/**
 * 列表
 * @param params
 * @returns
 */
export const getVideoList = params => {
  return request.post(Api.list, params)
}
