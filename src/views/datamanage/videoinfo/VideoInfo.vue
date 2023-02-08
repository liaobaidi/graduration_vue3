<template>
  <div class="flex container">
    <div class="bg-white p-4 w-2/3">
      <div class="w-full h-1/1">
        <div class="w-1/1 h-4/5">
          <video style="width: 100%; height: 100%;" controls :src="videoInfo.url"></video>
        </div>
        <div class="name mt-4 ellipsis1" style="font-size: 1.2vw">{{ videoInfo.name }}</div>
        <div class="flex justify-between mt-4" style="font-size: 0.9vw; color: #333">
          <div class="author">{{ videoInfo.username }}</div>
          <div class="date">{{ videoInfo.date }}</div>
        </div>
        <div class="flex justify-between mt-4">
          <div></div>
          <el-button link type="danger" @click="to_deleteVideo(videoInfo.id)">删除</el-button>
        </div>
      </div>
    </div>
    <div class="w-1/3 bg-white ml-4 p-4 flex flex-col justify-between">
      <div style="overflow-y: auto" class="scrollbar-hidden pb-8">
        <div class="list w-full mt-4" v-for="item in commentList" :key="item.id">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="pic mr-4">
                <el-image :src="item.url" class="user_img">
                  <template #placeholder>
                    <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt="" />
                  </template>
                  <template #error>
                    <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt="" />
                  </template>
                </el-image>
              </div>
              <div class="username">{{ item.username }}</div>
            </div>
            <div class="date" style="font-size: 0.9vw; color: #999">{{ item.date }}</div>
          </div>
          <div class="info" style="padding-left: 3.2vw">{{ item.info }}</div>
          <div class="flex justify-between">
            <span></span>
            <el-button
              link
              type="danger"
              class="action"
              v-if="userInfo.identity === 'admin' || userInfo.account === item.account"
              @click="to_delete(item.id)"
              >删除</el-button
            >
          </div>
        </div>
        <div v-if="!commentList.length">
          <el-empty description="暂时没有评论" />
        </div>
      </div>
      <div class="flex">
        <el-input v-model="comment_info" />
        <el-button type="primary" class="ml-4" @click="to_comment">发表</el-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { VideoList } from '../videolist/videoList'
import { getVideoDetail, deleteVideo, getCommentList, addComment, deleteComment } from './videoInfo.api'
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { CommentInfo } from '../../comment/commentlist/commentList'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const videoInfo: Partial<VideoList> = reactive({})
const commentList: CommentInfo[] = reactive([])
const currentPage = ref(1)
const pageSize = ref(1000)
const comment_info = ref('')
const userInfo = JSON.parse(localStorage.getItem('userinfo')!)

getInfo()
getComment()

function getInfo() {
  const postData = {
    id: +route.query.id!
  }
  getVideoDetail(postData).then(res => {
    Object.assign(videoInfo, res)
  })
}

function getComment() {
  const postData = {
    page: currentPage.value,
    pageSize: pageSize.value,
    video_id: +route.query.id!
  }
  getCommentList(postData).then((res: any) => {
    commentList.length = 0
    commentList.push(...res.items)
  })
}

function to_comment() {
  if (!comment_info.value) {
    ElMessage.warning('不能发表空的评论')
    return
  }
  const postData = {
    video_id: +route.query.id!,
    info: comment_info.value
  }
  addComment(postData).then(res => {
    if (res) {
      ElMessage.success('发表成功！')
      getComment()
      comment_info.value = ''
    }
  })
}

function to_delete(id: number) {
  deleteComment({ id }).then(res => {
    if (res) {
      ElMessage.success('删除成功！')
      getComment()
    }
  })
}

function to_deleteVideo(id: number) {
  deleteVideo({ id }).then(res => {
    if (res) {
      ElMessage.success('删除成功！')
      router.push('/home/datamanage/videolist')
    }
  })
}
</script>

<style lang="scss" scoped>
.pic {
  :deep(.el-image) {
    width: 2.4vw;
    height: 2.4vw;
    border-radius: 1.2vw;
  }
}

.container {
  height: 40vw;
}
</style>
