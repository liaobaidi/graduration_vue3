<template>
  <div id="basicTable">
    <div class="flex justify-between">
      <div class="flex w-1/1">
        <slot name="tableTitle" />
      </div>
      <div class="flex items-center">
        <div class="cursor-pointer mr-2 flex items-center" @click="reload">
          <el-tooltip content="刷新列表" placement="bottom">
            <el-icon size="24"><RefreshLeft /></el-icon>
          </el-tooltip>
        </div>
        <div class="cursor-pointer mr-2 flex items-center" @click="fullScreen">
          <el-tooltip :content="isFullScreen ? '关闭全屏' : '打开全屏'" placement="bottom">
            <el-icon size="24"><FullScreen /></el-icon>
          </el-tooltip>
        </div>
      </div>
    </div>
    <el-table style="width: 100%" v-bind="$attrs">
      <template v-for="(index, name) in $slots" :slot="name">
        <slot :name="name" />
      </template>
    </el-table>
    <div class="w-1/1 flex items-center mt-6 justify-end">
      <el-pagination v-bind="$attrs"></el-pagination>
    </div>
  </div>
</template>

<script setup lang="ts" name="BasicTable">
import { ref } from 'vue'

const emit = defineEmits(['reload'])

const isFullScreen = ref(false)

function fullScreen() {
  const el = document.querySelector('#basicTable')!
  if (!isFullScreen.value) {
    el.requestFullscreen()
    isFullScreen.value = true
  } else {
    document.exitFullscreen()
    isFullScreen.value = false
  }
}

function reload() {
  emit('reload')
}
</script>

<style scoped></style>
