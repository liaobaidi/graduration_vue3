<template>
  <div class="bg-white p-4 w-2/3">
    <div class="item">
      <div class="label font-600">作业标题：</div>
      <div class="content mt-2">{{ my_info.title }}</div>
    </div>
    <div class="item mt-4">
      <div class="label font-600">作业内容：</div>
      <div class="content mt-2">{{ my_info.info }}</div>
    </div>
    <div class="item mt-4">
      <span class="label font-600">班级：</span>
      <span class="content">{{ my_info.class_view }}</span>
    </div>
    <div class="item mt-4">
      <span class="label font-600">学号：</span>
      <span class="content">{{ my_info.account }}</span>
    </div>
    <div class="item mt-4">
      <span class="label font-600">姓名：</span>
      <span class="content">{{ my_info.username }}</span>
    </div>
    <div class="item mt-4">
      <span class="label font-600">作业：</span>
      <a :href="my_info.protocol" download class="content text-blue-400 cursor-pointer">{{
        my_info.protocol?.split('/').at(-1)
      }}</a>
    </div>
    <div v-if="identity !== 'student'" class="w-1/3">
      <div class="item mt-4 flex items-center w-1/1">
        <div class="label w-1/5">评分：</div>
        <div class="content w-4/5">
          <el-input v-model="my_info.score" />
        </div>
      </div>
      <div class="item mt-4 flex w-1/1">
        <div class="label w-1/5">评语：</div>
        <div class="content w-4/5">
          <el-input v-model="my_info.desc" type="textarea" autosize />
        </div>
      </div>
      <div class="item mt-4 flex w-1/1">
        <div class="label w-1/5"></div>
        <div class="content w-4/5">
          <el-button type="primary" @click="check">批改</el-button>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="item mt-4">
        <div class="label font-600">评分：</div>
        <div class="content mt-2">{{ my_info.score }}</div>
      </div>
      <div class="item mt-4">
        <div class="label font-600">评语：</div>
        <div class="content mt-2">{{ my_info.desc }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getHomeworkDetail } from '../createhomework/createHomework.api'
import { DataItem } from './homeworkInfo'
import { useRoute, useRouter } from 'vue-router'
import { reactive } from 'vue'
import { checkHomework } from './homeworkInfo.api'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const my_info: Partial<DataItem> = reactive({})
const identity = JSON.parse(localStorage.getItem('userinfo')!).identity

getInfo()

function getInfo() {
  const postData: { id?: number; homework_id?: number; status?: number } = {}
  if (route.query.id) {
    postData.id = +route.query.id!
  } else {
    postData.homework_id = +route.query.homework_id!
    postData.status = 1
  }
  getHomeworkDetail(postData).then(res => {
    Object.assign(my_info, res)
  })
}

function check() {
  const postData = {
    id: +route.query.id!,
    score: my_info.score,
    desc: my_info.desc
  }
  checkHomework(postData).then((res) => {
    if(res) {
      ElMessage.success('批改成功！')
      router.push('/home/homework/checkhomework')
    }
  })
}
</script>
