import axios from 'axios'
import type { AxiosResponse, AxiosRequestConfig } from 'axios'

const request = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_URL
})

request.interceptors.request.use((config: AxiosRequestConfig) => {
	return config
})

request.interceptors.response.use((response: AxiosResponse) => {
	const res = response.data
	return res
})

export default request
