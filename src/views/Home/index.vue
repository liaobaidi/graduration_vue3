<template>
	<div class="common-layout">
		<el-container>
			<el-aside>
				<Menu :isCollapse="isCollapse" />
			</el-aside>
			<el-container>
				<el-header>
					<Header @collapse="navCollapse" @lang="lang" />
				</el-header>
				<el-main>
					<RouterView />
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>
<script lang="ts" setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['lang'])
let isCollapse = ref(false)

const navCollapse = (e: boolean) => (isCollapse.value = e)

const lang = (e: string) => {
	emit('lang', e)
}
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
