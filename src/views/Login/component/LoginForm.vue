<template>
	<div class="w-1/2">
		<h1 class="font-700 title mb-4">登录</h1>
		<el-form ref="ruleFormRef" :model="loginForm" :rules="rules">
			<el-form-item prop="account">
				<el-input v-model="loginForm.account" placeholder="请输入学号" />
			</el-form-item>
			<el-form-item prop="psw">
				<el-input v-model="loginForm.psw" type="password" placeholder="请输入密码" />
			</el-form-item>
			<el-form-item>
				<el-checkbox v-model="remeber" label="记住我" size="large" />
			</el-form-item>
		</el-form>
		<el-button type="primary" class="w-1/1" @click="toLogin">登录</el-button>
	</div>
</template>
<script lang="ts" setup name="login-form">
import { onMounted, reactive, ref } from 'vue'
import { LoginFormDataType } from '../index'
import useLogin from '/@/hooks/useLogin'
import { useCookie } from '/@/hooks/useCookie'
import { useRouter } from 'vue-router'
import { expandRoutes } from '/@/router/route.data'

const cookie = useCookie()
const router = useRouter()

const loginForm: Partial<LoginFormDataType> = reactive({})
let remeber = ref(false)
let ruleFormRef = ref()
const rules = reactive({
	account: [{ required: true, message: '学号不可为空！', trigger: 'blur' }],
	psw: [{ required: true, message: '密码不可为空！', trigger: 'blur' }]
})

const toLogin = async () => {
	const permission = await ruleFormRef.value.validate()
	if (!permission) return
	const identity = (await useLogin(loginForm, remeber.value)) as string

	// 添加路由
	expandRoutes[identity].forEach((routerItem) => {
		router.addRoute('home', routerItem)
	})

	router.push({ path: '/home' })
}

onMounted(() => {
	let account = cookie.get('ACCOUNT')
	let psw = cookie.get('PSW')
	if (account) {
		loginForm.account = account
		loginForm.psw = psw
		remeber.value = true
	}
})
</script>

<style scoped lang="scss">
.title {
	font-size: 2.0833vw;
}
:deep(.el-input) {
	height: 2.0833vw;
}
:deep(.el-button) {
	height: 2.0833vw;
	line-height: 2.0833vw;
	font-size: 0.8333vw;
}
:deep(.el-form-item) {
	margin-bottom: 1.0417vw;
}
:deep(.el-checkbox.el-checkbox--large) {
	height: 2.0833vw;
	.el-checkbox__label {
		font-size: 0.7813vw;
	}
	.el-checkbox__inner {
		width: 1.0417vw;
		height: 1.0417vw;
		transform: rotateY(180deg);
	}
	.el-checkbox__inner::after {
		width: 0.4167vw;
		height: 0.2083vw;
		top: 0.3125vw;
		left: 0.2604vw;
	}
	.el-checkbox__input.is-checked .el-checkbox__inner::after {
		transform: rotate(45deg) scaleY(1);
	}
}
</style>
