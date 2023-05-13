import request from "/@/utils/request";

enum Api {
  total = '/homework/count/total',
  count = '/homework/count'
}

/**
 * 作业总数统计
 * @param params 
 * @returns 
 */
export const getHomeworkCountTotal = params => {
  return request.post(Api.total, params)
}

/**
 * 作业可视化数据
 * @param params 
 * @returns 
 */
export const getChartsCount = params => {
  return request.post(Api.count, params)
}