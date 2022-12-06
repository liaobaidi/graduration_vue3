<template>
	<div class="header-container p-5 bg-white flex items-center justify-between" bg="blue-500">
		<div class="flex items-center">
			<div class="mr-4 flex items-center cursor-pointer" @click="navCollapse">
				<el-icon size="20" v-if="!isCollapse"><Fold /></el-icon>
				<el-icon size="20" v-else><Expand /></el-icon>
			</div>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
				<el-breadcrumb-item><a href="/">promotion management</a></el-breadcrumb-item>
				<el-breadcrumb-item>promotion list</el-breadcrumb-item>
				<el-breadcrumb-item>promotion detail</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="flex items-center">
			<div class="cursor-pointer mr-2 flex items-center" @click="reload">
				<el-icon size="20"><RefreshLeft /></el-icon>
			</div>
			<div class="cursor-pointer mr-4 flex items-center" @click="fullScreen">
				<el-icon size="20"><FullScreen /></el-icon>
			</div>
			<div class="user flex items-center mr-4">
				<span class="mr-2">{{ greet }}</span>
        <span>xxx</span>
			</div>
      <div class="cursor-pointer flex items-center">
				<el-icon size="20"><Setting /></el-icon>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ref, defineEmits, onMounted } from 'vue'

let isCollapse = ref(false)
const emit = defineEmits(['collapse'])
let isFullScreen = ref(false)
let greet = ref('')

onMounted(() => {
	let hours = +new Date().getHours()
	if (hours > 18) {
		greet.value = '晚上好!'
	} else if (hours > 12) {
		greet.value = '下午好!'
	} else if (hours > 11) {
		greet.value = '中午好!'
	} else if (hours > 7) {
		greet.value = '上午好!'
	} else {
		greet.value = '早上好!'
	}
})

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
</style>
