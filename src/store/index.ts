import { createStore } from 'vuex'
import { user_login, user_logout } from '/@/api/user'
import { useCookie } from '/@/hooks/useCookie'
import router from '/@/router'
import { ElMessage } from 'element-plus'

const cookie = useCookie()

export default createStore({
	state: {
		userInfo: null,
		token: '',
	},
	mutations: {
		SET_TOKEN(state, token) {
			state.token = token
		},
		SET_INFO(state, info) {
			state.userInfo = info
		}
	},
	actions: {
		login({ commit }, postData) {
			return new Promise((resolve) => {
				user_login(postData).then((res) => {
					if (res) {
						commit('SET_TOKEN', res.token)
						commit('SET_INFO', res.userInfo)
						localStorage.setItem('userinfo', JSON.stringify(res.userInfo))
						localStorage.setItem('token', res.token)
						cookie.set('TOKEN', encodeURIComponent(res.token))
						cookie.set('USERINFO', encodeURIComponent(JSON.stringify(res.userInfo)))
						resolve(res.userInfo.identity)
					}
				})
			})
		},
		logout({ commit }) {
			user_logout().then((res) => {
				if (res) {
					commit('SET_TOKEN', null)
					commit('SET_INFO', null)
					localStorage.removeItem('userinfo')
					localStorage.removeItem('token')
					cookie.remove('TOKEN')
					cookie.remove('USERINFO')
					router.replace('/login')
					ElMessage.success('success')
				}
			})
		}
	}
})
