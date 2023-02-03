<template>
  <div class="flex">
    <div class="bg-white p-4 w-2/3">
      <div class="w-full">
        <div class="w-1/1">
          <video controls :src="videoInfo.url"></video>
        </div>
        <div class="name mt-4 ellipsis1" style="font-size: 1.2vw">{{ videoInfo.name }}</div>
        <div class="flex justify-between mt-4" style="font-size: 0.9vw; color: #333">
          <div class="author">{{ videoInfo.username }}</div>
          <div class="date">{{ videoInfo.date }}</div>
        </div>
        <div class="flex justify-between mt-4">
          <div></div>
          <el-button link type="danger">删除</el-button>
        </div>
      </div>
    </div>
    <div class="w-1/3 bg-white ml-4 p-4">123</div>
  </div>
</template>
<script setup lang="ts">
import { VideoList } from '../videolist/videoList'
import { getVideoDetail, deleteVideo, getCommentList, addComment, deleteComment } from './videoInfo.api'
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const videoInfo: Partial<VideoList> = reactive({})

getInfo()

function getInfo() {
  const postData = {
    id: +route.query.id!
  }
  getVideoDetail(postData).then(res => {
    Object.assign(videoInfo, res)
  })
}
</script>
