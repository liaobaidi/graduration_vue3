<script setup lang="ts">
import { ref, computed  } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

const language = ref('zh-cn')
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))
document.title = import.meta.env.VITE_APP_SYS_TITLE

const toggle = (e: string) => {
	language.value = e
}
</script>

<template>
	<el-config-provider :locale="locale">
		<RouterView v-on:lang="toggle" />
	</el-config-provider>
</template>

<style scoped lang="scss"></style>
