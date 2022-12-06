import router from '/@/router'
import { useCookie } from '/@/hooks/useCookie'

const cookie = useCookie()

const token = cookie.get('TOKEN')

router.beforeEach((to, from, next) => {
	if (to.path === '/login') {
		if (token) {
			next('/home')
		} else {
			next()
		}
	} else {
		if (token) {
			next()
		} else {
			next('/login')
		}
	}
})
