import { createRouter, createWebHashHistory } from 'vue-router'
import type { Router } from 'vue-router'
import { expandRoutes } from './route.data'

const router: Router = createRouter({
	routes: expandRoutes.common,
	history: createWebHashHistory()
})

export default router
