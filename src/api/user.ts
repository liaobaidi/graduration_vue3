import request from '/@/utils/request'

enum Api {
	login = '/sys/login',
	logout = '/sys/logout',
	list = '/user/list',
	update = '/sys/update'
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
/**
 * 登出
 * @returns
 */
export const user_logout = () => {
	return request.post(Api.logout)
}
/**
 * 修改密码
 * @param params
 * @returns
 */
export const user_update = (params: any) => {
	return request.post(Api.update, params)
}
