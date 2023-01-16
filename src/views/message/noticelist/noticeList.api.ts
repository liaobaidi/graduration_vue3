import request from '/@/utils/request'

enum Api {
  list = '/notice/list'
}
/**
 * 列表
 * @param params
 * @returns
 */
export const getNoticeList = params => {
  return request.post(Api.list, params)
}
