import axios from 'axios'
import type { AxiosResponse, AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import router from '/@/router'
import { useCookie } from '../hooks/useCookie'

const cookie = useCookie()
const request = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_URL
})

request.interceptors.request.use((config: AxiosRequestConfig) => {
	const token = cookie.get('TOKEN')

	config.headers['authorization'] = token

	return config
})

request.interceptors.response.use((response: AxiosResponse) => {
	const res = response.data
	if (+res.code > 10000) {
		ElMessage.error(res.msg)
	} else if (+res.code === 404) {
		router.replace({ name: '404' })
		ElMessage.error(res.msg)
	} else if(+res.code === 401) {
		// token 过期
		ElMessage.error(res.msg)
		localStorage.removeItem('token')
		cookie.remove('TOKEN')
		location.reload()
	}
	return res.info
})

export default request
