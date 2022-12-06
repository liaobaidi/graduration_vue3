<template>
	<div class="login-container flex">
		<div class="w-3/5 h-1/1 left-part flex flex-col justify-center items-center">
			<div class="flex items-center">
				<el-icon size="56">
					<img src="/icon.svg" alt="" />
				</el-icon>
				<span class="ml-4 text-white font-700 title">{{ sys_title }}</span>
			</div>
			<img class="w-1/2 h-3/5" src="../../static/images/logo.svg" alt="" />
		</div>
		<div class="w-2/5 h-1/1"></div>
	</div>
</template>
<script lang="ts" setup>
let sys_title = import.meta.env.VITE_APP_SYS_TITLE
</script>

<style scoped lang="scss">
.login-container {
	position: relative;
	width: 100vw;
	height: 100vh;
	.left-part {
		background: url('/@/static/images/login-bg.svg') no-repeat center right;
		background-size: cover;
    .title {
      font-size: 1.875vw;
    }
	}
}
</style>
