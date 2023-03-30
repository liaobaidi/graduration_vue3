import request from '/@/utils/request'

enum Api {
  list = '/course/list',
  import = '/course/import'
}
/**
 * 课程表
 * @param params 
 * @returns 
 */
export const getCourseList = params => {
  return request.post(Api.list, params)
}
/**
 * 导入课程表
 * @param params 
 * @returns 
 */
export const importCourse = params => {
  return request({
    url: Api.import,
    method: 'POST',
    data: params,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
