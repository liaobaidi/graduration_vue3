<template>
	<div class="common-layout">
		<el-container>
			<el-aside>
				<Menu :isCollapse="isCollapse" />
			</el-aside>
			<el-container>
				<el-header>
					<Header @collapse="navCollapse" />
				</el-header>
				<el-main>
					<RouterView />
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

let isCollapse = ref(false)

const navCollapse = (e: boolean) => (isCollapse.value = e)
</script>
<style scoped lang="scss">
.common-layout {
	// padding: .5208vw;
}
:deep(.el-container) {
	height: 100vh;
	overflow-y: auto;
}
:deep(.el-header) {
	padding: 0;
}
:deep(.el-aside) {
	width: unset;
}
</style>
