import router from '/@/router/index'
import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from '/@/store/index'

export const my_use = (app: App<Element>) => {
	// 注册路由
	app.use(router)

	// 注册状态管理
	app.use(store)

	// 导入图标
	for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
		app.component(key, component)
	}
}
