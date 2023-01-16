<template>
  <div class="flex">
    <div v-loading="loading" :class="['w-1/2 bg-white p-4 pb-12 mr-4 relative', noticeInfo.protocol ? 'pb-20' : '']">
      <div class="title font-700 text-center" style="font-size: 1.8vw">{{ noticeInfo.title }}</div>
      <div class="author font-500 text-center text-gray-500 mt-6" style="font-size: 1vw">{{ noticeInfo.author }}</div>
      <div class="info mt-6" style="font-size: 1.2vw">{{ noticeInfo.info }}</div>
      <div class="absolute bottom-4">
        <div class="date ext-center text-gray-500 mt-6" style="font-size: 0.9vw">{{ noticeInfo.date }}</div>
        <div v-if="noticeInfo.protocol" class="protocol text-blue-500 cursor-pointer mt-2" style="font-size: 1vw">
          <a :href="noticeInfo.protocol" download>附件</a>
        </div>
      </div>
    </div>
    <div class="w-1/2 bg-white p-4 h-1/2">
      <div
        v-for="(item, index) in noticeList"
        :key="index"
        class="flex justify-between cursor-pointer"
        @click="router.push(`/home/message/noticeinfo?id=${item.id}`)"
      >
        <div class="flex">
          <div class="mr-2">{{ index + 1 }}.</div>
          <div class="ellipsis1">{{ item.title }}</div>
        </div>
        <div class="ellipsis1 text-gray-500">{{ item.date }}</div>
      </div>
      <div class="text-center text-blue-500 cursor-pointer" @click="router.push('/home/message/noticelist')">更多</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, watchEffect, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getNoticeInfo } from './noticeInfo.api'
import { DataItem } from '../noticelist/noticeList'
import { getNoticeList } from '../noticelist/noticeList.api'
import { PostData } from '/@/types'

const route = useRoute()
const router = useRouter()
const noticeInfo: Partial<DataItem> = reactive({})
const noticeList: DataItem[] = reactive([])
const loading = ref(false)

getList()

watchEffect(() => {
  if (route.query.id) {
    getDetail()
  }
})

function getDetail() {
  loading.value = true
  const postData = {
    id: route.query.id
  }
  getNoticeInfo(postData).then(res => {
    Object.assign(noticeInfo, res)
    loading.value = false
  })
}
function getList() {
  const postData: PostData = {
    page: 1,
    pageSize: 20
  }
  getNoticeList(postData).then(res => {
    noticeList.length = 0
    noticeList.push(...res.items)
  })
}
</script>
