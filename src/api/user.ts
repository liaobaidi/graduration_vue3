import request from '/@/utils/request'

enum Api {
	login = '/user/login',
	list = '/user/list'
}
/**
 * 用户列表
 * @returns
 */
export const userList = (params: any) => {
	return request.post(Api.list, params)
}
/**
 * 登录
 * @param params
 * @returns
 */
export const user_login = (params: any) => {
	return request.post(Api.login, params)
}
