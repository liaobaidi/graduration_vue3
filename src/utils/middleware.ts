import router from '/@/router/index'
import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export const my_use = (app: App<Element>) => {
	// 注册路由
	app.use(router)

	// 导入图标
	for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
		app.component(key, component)
	}
}
