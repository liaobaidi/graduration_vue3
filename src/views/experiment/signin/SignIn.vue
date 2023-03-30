<template>
  <div class="bg-white p-4" v-if="userInfo.identity !== 'student'">
    <el-alert title="提示" type="warning" description="请填写完相关信息再开启签到以确保考勤信息不出错" show-icon />
    <div class="flex w-1/2 items-center mt-4">
      <span class="w-1/3">请输入实验室编号：</span>
      <el-input v-model="experiment_id" placeholder="如：实102" />
      <el-button type="primary" class="ml-4" @click="toQuery">查询</el-button>
    </div>
    <div class="mt-4 bg-red" v-if="courseInfo.length">
      <div>
        <span>课程：</span>
        <span>{{ courseInfo[0].course_name }}</span>
      </div>
      <div class="mt-2">
        <span>老师：</span>
        <span>{{ courseInfo[0].username }}</span>
      </div>
      <div class="mt-2">
        <span>班级：</span>
        <span>{{ courseInfo.map(item => item.class_view).join(',') }}</span>
      </div>
      <div class="mt-2 flex items-center">
        <span class="w-1/10">设置签到密码：</span>
        <div class="w-1/3">
          <el-input v-model.trim="sign_psw" />
        </div>
      </div>
      <div class="mt-2">
        <el-button type="primary" v-if="!courseInfo[0].sign_in" @click="toStart">开启签到</el-button>
        <el-button type="danger" v-else @click="toEnd">结束签到</el-button>
        <span class="ml-8"
          >应出勤：{{
            courseInfo.map(item => item.class_count).reduce((sum, item) => (sum += item), 0)
          }}人，已签到：{{ sign_in_num }}人</span
        >
      </div>
    </div>
  </div>
  <Student v-else />
</template>
<script lang="ts" setup>
import { ref, reactive, onBeforeUnmount } from 'vue'
import { getCourseList } from '../courselist/courselist.api'
import { dayjs, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { startSignIn, endSignIn, getSignInNum } from './siginIn.api'
import Student from './component/Student.vue'
import { getTime } from './signIn.data'

const router = useRouter()
const userInfo = JSON.parse(localStorage.getItem('userinfo')!)
const experiment_id = ref('')
const courseInfo: Course[] = reactive([])
const sign_psw = ref('')
let timer = null
const sign_in_num = ref(0)

onBeforeUnmount(() => {
  if (courseInfo.length > 0) {
    toEnd()
  }
})

if (!getTime()) {
  ElMessage.error('非上课时间，不能签到！')
  router.go(-1)
}

function getNum() {
  const postData = {
    course_id: courseInfo[0].course_id,
    course_time: courseInfo[0].course_time,
    time: courseInfo[0].time
  }
  getSignInNum(postData).then((res: any) => {
    sign_in_num.value = res
  })
}

function toQuery() {
  const postData = {
    page: 1,
    pageSize: 100000,
    account: userInfo.account,
    time: dayjs().format('YYYY-MM-DD'),
    experiment_id: experiment_id.value.trim(),
    course_time: getTime()
  }
  getCourseList(postData).then((res: any) => {
    courseInfo.length = 0
    courseInfo.push(...res.items)
    sign_psw.value = courseInfo[0]?.sign_psw
    if(!res.total) {
      ElMessage.error('暂无教学安排！')
    }
  })
}

function toStart() {
  const postData = {
    course_id: courseInfo[0].course_id,
    course_time: courseInfo[0].course_time,
    time: courseInfo[0].time,
    sign_psw: sign_psw.value,
    class_ids: courseInfo.map(item => item.class_id).join(',')
  }
  startSignIn(postData).then(res => {
    if (res) {
      ElMessage.warning('签到已开始，请勿离开本页面！！！')
      toQuery()
      timer = setInterval(() => {
        getNum()
      }, 3000)
    }
  })
}

function toEnd() {
  const postData = {
    course_id: courseInfo[0].course_id,
    course_time: courseInfo[0].course_time,
    time: courseInfo[0].time,
    class_ids: courseInfo.map(item => item.class_id).join(',')
  }
  endSignIn(postData).then(res => {
    if (res) {
      ElMessage.warning('签到已结束')
      toQuery()
      clearInterval(timer)
    }
  })
}
</script>
