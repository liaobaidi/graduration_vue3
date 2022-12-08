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
			meta: {
				name: '/首页'
			},
			children: [
				{
					name: '404',
					path: '/404',
					meta: {
						name: '/页面没有找到'
					},
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
	admin: [
		{
			path: 'test',
			name: 'test',
			meta: {
				name: '/首页/测试'
			},
			component: () => import('/@/views/404/index.vue'),
			children: [{ path: 'test', name: 'test', component: () => import('/@/views/404/index.vue') }]
		}
	],
	teacher: [
		{
			path: 'test2',
			name: 'test2',
			meta: {
				name: '/首页/测试'
			},
			component: () => import('/@/views/404/index.vue'),
			children: [{ path: 'test2', name: 'test2', meta: { name: '/首页/测试/测试2' }, component: () => import('/@/views/404/index.vue') }]
		}
	],
	student: []
}
