import router from '/@/router'
import { useCookie } from '/@/hooks/useCookie'
import { expandRoutes } from '/@/router/route.data'

const cookie = useCookie()

router.beforeEach((to, from, next) => {
	const token = cookie.get('TOKEN')
	if (token) {
    // 防止动态路由在页面刷新的时候丢失
		const identity = JSON.parse(localStorage.getItem('userinfo')!).identity
		if (!router.hasRoute(to.name!)) {
			// 添加路由
			expandRoutes[identity].forEach((routerItem) => {
				router.addRoute('home', routerItem)
			})      
			next(to.fullPath)
		}
	}
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
