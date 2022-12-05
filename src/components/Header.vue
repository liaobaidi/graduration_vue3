<template>
	<div class="header-container p-5 bg-white flex items-center" bg="blue-500">
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
</template>
<script lang="ts" setup>
import { ref, defineEmits } from 'vue'

let isCollapse = ref(false)
const emit = defineEmits(['collapse'])

function navCollapse() {
	isCollapse.value = !isCollapse.value
	emit('collapse', isCollapse.value)
}
</script>
<style scoped lang="scss">
.header-container {
}
</style>
