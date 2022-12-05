<template>
	<div class="menu-container h-1/1">
		<el-menu :collapse="isCollapse" class="el-menu-vertical-demo">
			<div class="p-4 text-white font-700 ellipsis1 text-center">
				<el-icon><document /></el-icon>
				<span class="ml-2" v-if="!isCollapse">{{ sys_title }}</span>
			</div>
			<el-sub-menu index="1">
				<template #title>
					<el-icon><location /></el-icon>
					<span>Navigator One</span>
				</template>
				<el-menu-item index="1-1">item one</el-menu-item>
				<el-menu-item index="1-2">item two</el-menu-item>
				<el-menu-item index="1-3">item three</el-menu-item>
				<el-sub-menu index="1-4">
					<template #title>item four</template>
					<el-menu-item index="1-4-1">item one</el-menu-item>
				</el-sub-menu>
			</el-sub-menu>
			<el-menu-item index="2">
				<el-icon><document /></el-icon>
				<span>Navigator Two</span>
			</el-menu-item>
			<el-menu-item index="3" disabled>
				<el-icon><document /></el-icon>
				<span>Navigator Three</span>
			</el-menu-item>
			<el-menu-item index="4">
				<el-icon><setting /></el-icon>
				<span>Navigator Four</span>
			</el-menu-item>
		</el-menu>
	</div>
</template>
<script lang="ts" setup name="menu">
import { defineProps } from 'vue'
defineProps({
	isCollapse: {
		type: Boolean,
		default: false
	}
})
let sys_title = import.meta.env.VITE_APP_SYS_TITLE
</script>

<style scoped lang="scss">
.menu-container {
	background-color: #001529;
}
</style>
