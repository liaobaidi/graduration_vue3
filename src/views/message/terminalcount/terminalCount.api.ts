import request from '/@/utils/request'

enum Api {
  list = '/terminal/count/list',
  change = '/terminal/count/grade',
  count = '/terminal/count'
}

/**
 * 获取基本信息
 * @param params
 * @returns
 */
export const getTerminalList = params => {
  return request.post(Api.list, params)
}

/**
 * 修改成绩
 * @param params
 * @returns
 */
export const changeTerminalGrade = params => {
  return request.post(Api.change, params)
}

/**
 * 获取成绩
 * @param params
 * @returns
 */
export const getTerminalCount = params => {
  return request.post(Api.count, params)
}
