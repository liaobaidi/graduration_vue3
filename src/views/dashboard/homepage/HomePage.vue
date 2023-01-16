<template>
  <div class="flex h-1/1">
    <div class="w-1/2 mr-4 bg-white p-4">
      <div class="text-center font-700" style="font-size: 1.2vw">简介</div>
    </div>
    <div class="w-1/2 bg-white h-1/2 p-4">
      <div class="text-center font-700" style="font-size: 1.2vw">公告</div>
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
import { useRouter } from 'vue-router'
import { DataItem } from '../../message/noticelist/noticeList'
import { getNoticeList } from '../../message/noticelist/noticeList.api'
import { PostData } from '/@/types'

const router = useRouter()
const noticeList: DataItem[] = reactive([])

getList()

function getList() {
  const postData: PostData = {
    page: 1,
    pageSize: 11
  }
  getNoticeList(postData).then((res: any) => {
    noticeList.length = 0
    noticeList.push(...res.items)
  })
}
</script>
