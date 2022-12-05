import router from '/@/router/index'
import type { App } from 'vue'
export const my_use = (app: App<Element>) => {
	app.use(router)
}
