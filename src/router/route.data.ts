import type { RouteRecordRaw } from 'vue-router'

interface ExpandRoute {
	[key: string]: RouteRecordRaw[]
}
export const expandRoutes: ExpandRoute = {
	common: [
		{
			path: '/',
			redirect: '/home'
		},
		{
			name: 'home',
			path: '/home',
			component: () => import('/@/views/Home/index.vue'),
			children: [
				{
					name: '404',
					path: '/404',
					component: () => import('/@/views/404/index.vue')
				}
			]
		},
		{
			name: 'login',
			path: '/login',
			component: () => import('/@/views/Login/index.vue')
		}
	],
	admin: [],
	teacher: [],
	student: []
}
