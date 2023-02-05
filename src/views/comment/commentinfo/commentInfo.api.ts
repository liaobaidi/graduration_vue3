import request from '/@/utils/request'

enum Api {
  detail = '/comment/info',
  update = '/comment/addOrUpdate'
}

/**
 * 评论详情
 * @param params
 * @returns
 */
export const getCommentDetail = params => {
  return request.post(Api.detail, params)
}
/**
 * 修改评论
 * @param params
 * @returns
 */
export const updateComment = params => {
  return request.post(Api.update, params)
}
