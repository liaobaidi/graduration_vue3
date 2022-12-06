import { createStore } from 'vuex'
import { user_login } from '/@/api/user'
import { useCookie } from '/@/hooks/useCookie'

const cookie = useCookie()

export default createStore({
	state: {
		userInfo: null,
		token: ''
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
			user_login(postData).then((res) => {
				commit('SET_TOKEN', res.token)
				commit('SET_INFO', res.userInfo)
				localStorage.setItem('userinfo', JSON.stringify(res.userInfo))
				localStorage.setItem('token', res.token)
				cookie.set('TOKEN', encodeURIComponent(res.token))
				cookie.set('USERINFO', encodeURIComponent(JSON.stringify(res.userInfo)))
			})
		}
	}
})
