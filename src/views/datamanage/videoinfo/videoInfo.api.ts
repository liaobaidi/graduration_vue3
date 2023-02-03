import request from '/@/utils/request'

enum Api {
  detail = '/video/info',
  delete = '/video/delete',
  list = '/comment/list',
  add = '/comment/addOrUpdate',
  com_delet = '/comment/delete'
}
/**
 * 视频详情
 * @param params
 * @returns
 */
export const getVideoDetail = params => {
  return request.post(Api.detail, params)
}
/**
 * 删除视频
 * @param params
 * @returns
 */
export const deleteVideo = params => {
  return request.post(Api.delete, params)
}
/**
 * 评论列表
 * @param params
 * @returns
 */
export const getCommentList = params => {
  return request.post(Api.list, params)
}
/**
 * 添加评论
 * @param params
 * @returns
 */
export const addComment = params => {
  return request.post(Api.add, params)
}
/**
 * 删除评论
 * @param params
 * @returns
 */
export const deleteComment = params => {
  return request.post(Api.com_delet, params)
}
