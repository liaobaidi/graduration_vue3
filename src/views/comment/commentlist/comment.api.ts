import request from '/@/utils/request'

enum Api {
  list = '/comment/list',
  delete = '/comment/delete'
}

/**
 * 列表
 * @param params
 * @returns
 */
export const getCommentList = params => {
  return request.post(Api.list, params)
}
/**
 * 删除
 * @param params
 * @returns
 */
export const deleteComment = params => {
  return request.post(Api.delete, params)
}
