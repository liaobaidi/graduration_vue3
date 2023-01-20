import request from "/@/utils/request";

enum Api {
  save = '/homework/commit'
}
/**
 * 提交作业
 * @param params 
 * @returns 
 */
export const commitHomework = params => {
  return request.post(Api.save, params)
}