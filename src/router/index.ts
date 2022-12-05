import { createRouter, createWebHashHistory } from 'vue-router'
import type { Router, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/home'
	},
	{
		name: 'home',
		path: '/home',
		component: () => import('/@/views/Home/index.vue')
	}
]

const router: Router = createRouter({
	routes,
	history: createWebHashHistory()
})

export default router
