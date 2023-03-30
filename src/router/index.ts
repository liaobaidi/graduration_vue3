import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import type { Router } from 'vue-router'
import { expandRoutes } from './route.data'

const router: Router = createRouter({
	routes: expandRoutes.common,
	history: createWebHistory()
})

export default router
