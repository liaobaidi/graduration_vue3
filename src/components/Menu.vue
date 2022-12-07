<template>
	<div class="menu-container h-1/1">
		<el-menu :collapse="isCollapse" router>
			<div class="p-4 text-white font-700 ellipsis1 text-center flex items-center justify-center">
				<el-icon size="26">
					<img src="/icon.svg" alt="" />
				</el-icon>
				<span class="ml-2 ellipsis1" v-if="!isCollapse">{{ sys_title }}</span>
			</div>
			<el-sub-menu v-for="(item, index) in menuData[identity]" :key="index" :index="item.path">
				<template #title>
					<el-icon><location /></el-icon>
					<span>{{ item.name }}</span>
				</template>
				<el-menu-item v-for="(it, i) in item.children" :key="i" :index="it.path">{{ it.name }}</el-menu-item>
			</el-sub-menu>
		</el-menu>
	</div>
</template>
<script lang="ts" setup name="menu">
import { defineProps } from 'vue'
import menuData from './data/menu.data'
import { useRouter } from 'vue-router'
defineProps({
	isCollapse: {
		type: Boolean,
		default: false
	}
})
const router = useRouter()
let sys_title = import.meta.env.VITE_APP_SYS_TITLE
let identity = JSON.parse(localStorage.getItem('userinfo')!).identity
console.log(identity, 'identity')

</script>

<style scoped lang="scss">
.menu-container {
	background-color: #001529;
}
</style>
