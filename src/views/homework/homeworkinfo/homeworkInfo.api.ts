import request from '/@/utils/request'

enum Api {
  check = '/homework/check'
}
/**
 * 批改作业
 * @param params
 * @returns
 */
export const checkHomework = params => {
  return request.post(Api.check, params)
}
