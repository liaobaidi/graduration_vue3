import request from '/@/utils/request'

enum Api {
  detail = '/notice/info'
}
/**
 * 详情
 * @param params
 * @returns
 */
export const getNoticeInfo = params => {
  return request.post(Api.detail, params)
}
