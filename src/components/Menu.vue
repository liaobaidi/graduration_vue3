<template>
	<div class="menu-container h-1/1">
		<el-menu :collapse="isCollapse" class="el-menu-vertical-demo">
			<div class="title text-white font-700 flex items-center justify-center ellipsis1">
				<el-icon class="mr-2"><document /></el-icon>
				<span v-if="!isCollapse">{{ sys_title }}</span>
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
  .title {
    height: 2.0833vw;
    line-height: 2.0833vw;
    text-align: center;
    vertical-align: middle;
  }
}
</style>
