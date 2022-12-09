<template>
	<div class="header-container p-4 bg-white flex items-center justify-between" bg="blue-500">
		<div class="flex items-center">
			<div class="mr-4 flex items-center cursor-pointer" @click="navCollapse">
				<el-icon size="24" v-if="!isCollapse"><Fold /></el-icon>
				<el-icon size="24" v-else><Expand /></el-icon>
			</div>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index" :to="{ path: breadPath[index].path }">{{ item }}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="flex items-center">
			<div class="cursor-pointer mr-2 flex items-center" @click="reload">
				<el-icon size="24"><RefreshLeft /></el-icon>
			</div>
			<div class="cursor-pointer mr-4 flex items-center" @click="fullScreen">
				<el-icon size="24"><FullScreen /></el-icon>
			</div>
			<div class="user flex items-center mr-4">
				<span class="mr-2">{{ greet }}</span>
				<span>{{ user }}</span>
			</div>
			<div class="cursor-pointer flex items-center">
				<el-dropdown @command="handle">
					<span class="el-dropdown-link">
						<el-icon size="24"><Setting /></el-icon>
					</span>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item command="user_info">账户设置</el-dropdown-item>
							<el-dropdown-item command="update_psw">修改密码</el-dropdown-item>
							<el-dropdown-item command="logout">退出登录</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</div>
		</div>
	</div>
	<el-dialog v-model="update_status" title="修改密码" width="20%" @closed="clearData">
		<div>
			<el-form :model="formData" ref="form" :rules="formRules" label-width="80px">
				<el-form-item label="密码" prop="psw" class="w-4/5">
					<el-input v-model="formData.psw" />
				</el-form-item>
				<el-form-item label="新密码" prop="newPsw" class="w-4/5">
					<el-input v-model="formData.newPsw" />
				</el-form-item>
			</el-form>
			<div class="flex justify-center">
				<el-button type="primary" @click="update">修改</el-button>
			</div>
		</div>
	</el-dialog>
</template>
<script lang="ts" setup>
import { ref, defineEmits, onMounted, watchEffect, reactive } from 'vue'
import { useRoute, RouteLocationMatched } from 'vue-router'
import { useStore } from 'vuex'
import { user_update } from '/@/api/user'

const route = useRoute()
const store = useStore()
let isCollapse = ref(false)
const emit = defineEmits(['collapse'])
let isFullScreen = ref(false)
let greet = ref('')
let user = JSON.parse(localStorage.getItem('userinfo')!).username
const breadcrumb: string[] = reactive([])
const breadPath: RouteLocationMatched[] = reactive([])
let update_status = ref(false)
const formData = reactive({
	psw: '',
	newPsw: ''
})
const formRules = {
	psw: [{ validator: checkPass, trigger: 'blur' }],
	newPsw: [{ validator: checkPass2, trigger: 'blur' }]
}
let form = ref()

async function update() {
	const permission = await form.value.validate()
	if(!permission) return
	const postData = formData
	user_update(postData).then((res) => {
		if(res) {
			update_status.value = false
			store.dispatch('logout')
		}
	})
}

function clearData() {
	form.value.resetFields()
}

function checkPass(rule: any, value: any, callback: any) {
	if (!formData.psw) {
		callback(new Error('密码不可为空！'))
	} else {
		callback()
	}
}

function checkPass2(rule: any, value: any, callback: any) {
	if (!formData.newPsw) {
		callback(new Error('密码不可为空！'))
	} else {
		callback()
	}
}

watchEffect(() => {
	breadcrumb.length = 0
	breadcrumb.push(...route.meta.name.split('/'))
	breadcrumb.shift()
	breadPath.length = 0
	breadPath.push(...route.matched)
})

onMounted(() => {
	let hours = +new Date().getHours()
	if (hours > 18) {
		greet.value = '晚上好 !'
	} else if (hours > 12) {
		greet.value = '下午好 !'
	} else if (hours > 11) {
		greet.value = '中午好 !'
	} else if (hours > 7) {
		greet.value = '上午好 !'
	} else {
		greet.value = '早上好 !'
	}
})

function handle(command: string) {
	switch (command) {
		case 'logout':
			store.dispatch('logout')
			break
		case 'update_psw':
			update_status.value = true
			break
		case 'use_info':
			break
		default:
			break
	}
}

function navCollapse() {
	isCollapse.value = !isCollapse.value
	emit('collapse', isCollapse.value)
}

function fullScreen() {
	let el = document.documentElement
	if (!isFullScreen.value) {
		el.requestFullscreen()
		isFullScreen.value = true
	} else {
		document.exitFullscreen()
		isFullScreen.value = false
	}
}
function reload() {
	location.reload()
}
</script>
<style scoped lang="scss">
.header-container {
}
:deep(.el-breadcrumb) {
	font-size: 0.8333vw;
	cursor: pointer;
}
</style>
