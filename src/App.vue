<script setup lang="ts">
import { ref, computed, provide  } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import dayjs from 'dayjs'

const language = ref('zh-cn')
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))
document.title = import.meta.env.VITE_APP_SYS_TITLE

const toggle = (e: string) => {
	language.value = e
}
provide('dayjs', dayjs)
</script>

<template>
	<el-config-provider :locale="locale">
		<RouterView v-on:lang="toggle" />
	</el-config-provider>
</template>

<style scoped lang="scss"></style>
