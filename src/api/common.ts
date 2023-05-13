import request from "../utils/request";

enum Api {
  class_list = '/course/class/list'
}

/**
 * 获取班级
 */
export const getClassList = () => {
  return request.post(Api.class_list)
}