import request from '/@/utils/request'

enum Api {
  start = '/course/sigin/start',
  end = '/course/signin/end',
  sign = '/course/signin',
  status = '/course/signin/status',
  num = '/course/signin/num'
}

/**
 * 开启签到
 * @param params
 * @returns
 */
export const startSignIn = params => {
  return request.post(Api.start, params)
}
/**
 * 关闭签到
 * @param params
 * @returns
 */
export const endSignIn = params => {
  return request.post(Api.end, params)
}
/**
 * 签到
 * @param params 
 * @returns 
 */
export const signIn = params => {
  return request.post(Api.sign, params)
}
/**
 * 获取签到状态
 * @param params 
 * @returns 
 */
export const getSignInStatus = params => {
  return request.post(Api.status, params)
}

/**
 * 获取签到人数
 * @param params 
 * @returns 
 */
export const getSignInNum = params => {
  return request.post(Api.num, params)
}