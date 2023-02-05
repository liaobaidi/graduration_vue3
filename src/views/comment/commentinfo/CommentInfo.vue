<template>
  <div class="bg-white p-8">
    <div class="item flex w-1/3">
      <div class="label w-1/3 text-right">视频名称：</div>
      <div class="content w-2/3 pl-4">{{ commentInfo.name }}</div>
    </div>
    <div class="item flex mt-4 w-1/3">
      <div class="label w-1/3 text-right">评论人：</div>
      <div class="content w-2/3 pl-4">{{ commentInfo.username }}</div>
    </div>
    <div class="item flex mt-4 w-1/3">
      <div class="label w-1/3 text-right">评论内容：</div>
      <div class="content w-2/3 pl-4">
        <el-input v-model="commentInfo.info" type="textarea" autosize/>
      </div>
    </div>
    <div class="item flex mt-4 w-1/3">
      <div class="label w-1/3 text-right">评论时间：</div>
      <div class="content w-2/3 pl-4">{{ commentInfo.date }}</div>
    </div>
    <div class="item flex mt-4 w-1/3">
      <div class="label w-1/3 text-right"></div>
      <div class="content w-2/3 pl-4">
        <el-button type="primary" @click="to_update">修改</el-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getCommentDetail, updateComment } from './commentInfo.api'
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus';

interface CommentInfo {
  id: number
  info: string
  date: string
  username: string
  name: string
}

const route = useRoute()
const router = useRouter()
const commentInfo: Partial<CommentInfo> = reactive({})

if (route.query.id) {
  getCommentDetail({ id: +route.query.id }).then(res => {
    console.log(res);
    
    Object.assign(commentInfo, res)
  })
}

function to_update() {
  const postData: Partial<CommentInfo> = {
    id: commentInfo.id,
    info: commentInfo.info
  }
  updateComment(postData).then((res) => {
    if(res) {
      ElMessage.success('修改成功！')
      router.push('/home/comment/commentlist')
    }
  })
}
</script>
