import request from "/@/utils/request";

enum Api {
  list = '/terminal/count/stu'
}

/**
 * 获取各科成绩
 * @returns 
 */
export const getGradeList = () => {
  return request.post(Api.list)
}