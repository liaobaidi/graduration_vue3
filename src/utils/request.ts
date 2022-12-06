import axios from 'axios'
import type { AxiosResponse, AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import router from '/@/router'

const request = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_URL
})

request.interceptors.request.use((config: AxiosRequestConfig) => {
	return config
})

request.interceptors.response.use((response: AxiosResponse) => {
	const res = response.data
	if (res.code > 10000) {
		ElMessage.error(res.msg)
		return res
	} else if (+res.code === 404) {
		router.replace({ name: '404' })
	}
	return res.info
})

export default request
