import { createApp } from 'vue'
import App from './App.vue'
import { my_use } from '/@/utils/middleware'


import '/@/assets/css/index.scss'
import '/@/assets/css/common.scss'
import 'virtual:windi.css'
import 'element-plus/dist/index.css'
import '/@/assets/css/elementui.scss'

import './permission'

const app = createApp(App)

my_use(app)

app.mount('#app')
