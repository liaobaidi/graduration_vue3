<template>
  <div class="bg-white w-1/1 h-1/1 flex justify-center items-center">
    <div v-if="!siginIn" class="btn flex justify-center items-center" @click="inputVisible = true">签到</div>
    <div v-else class="btn flex justify-center items-center" style="background-color: #ccc">已签到</div>
    <el-dialog v-model="inputVisible" width="30%" title="请输入签到密码">
      <div class="flex items-center">
        <span class="w-1/3">密码：</span>
        <el-input v-model.trim="sign_psw" />
      </div>
      <div class="flex items-center mt-4 justify-center">
        <el-button type="primary" @click="toSignIn">签到</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { signIn, getSignInStatus } from '../siginIn.api'
import { getCourseList } from '../../courselist/courselist.api'
import { ElMessage, dayjs } from 'element-plus'
import { useRouter } from 'vue-router'
import { getTime } from '../signIn.data'
const siginIn = ref(false)
const inputVisible = ref(false)
const userInfo = JSON.parse(localStorage.getItem('userinfo')!)
const courseInfo: Partial<Course> = reactive({})
const sign_psw = ref('')
const router = useRouter()

getCourseInfo()
getStatus()

function getStatus() {
  const postData = {
    course_time: getTime(),
    time: dayjs().format("YYYY-MM-DD"),
    student_id: userInfo.account
  }
  getSignInStatus(postData).then((res) => {
    if(!res) {
      siginIn.value = true
    }
  })
}
function getCourseInfo() {
  const postData = {
    page: 1,
    pageSize: 100000,
    sign_in: 1,
    class_id: userInfo.class_id
  }
  getCourseList(postData).then((res: any) => {
    if (!res.items.length) {
      ElMessage.error('还未开始签到！')
      router.go(-1)
    }
    Object.assign(courseInfo, res.items[0])
  })
}

function toSignIn() {
  const postData = {
    student_id: userInfo.account,
    class_id: userInfo.class_id,
    course_id: courseInfo.course_id,
    time: courseInfo.time,
    course_time: courseInfo.course_time,
    sign_psw: sign_psw.value
  }
  signIn(postData).then(res => {
    if (res) {
      ElMessage.success('签到成功！')
      siginIn.value = true
      router.go(-1)
    }
  })
}
</script>
<style scoped>
.btn {
  width: 20vw;
  height: 20vw;
  border-radius: 10vw;
  background-color: skyblue;
  font-size: 3vw;
  color: #fff;
  cursor: pointer;
}
</style>
