import request from "/@/utils/request";

enum Api {
  count = '/course/signin/count',
  list = '/course/list/teach'
}

/**
 * 考勤统计
 * @param params 
 * @returns 
 */
export const getSigninCount = params => {
  return request.post(Api.count, params)
}

/**
 * 获取课程列表选项
 * @param params 
 * @returns 
 */
export const getCourseListTeach = params => {
  return request.post(Api.list, params)
}