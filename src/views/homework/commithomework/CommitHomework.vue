<template>
  <div class="bg-white p-4 w-1/2" v-loading="loading">
    <div class="item w-1/1">
      <div class="label font-600">作业标题：</div>
      <div class="content mt-4">{{ homework_info.title }}</div>
    </div>
    <div class="item w-1/1 mt-4">
      <div class="label font-600">作业内容：</div>
      <div class="content mt-4">{{ homework_info.info }}</div>
    </div>
    <div class="item w-1/1 mt-4" v-if="homework_info.protocol && homework_info.protocol !== 'undefined'">
      <div class="label font-600">附件：</div>
      <div class="content mt-4">
        <a :href="homework_info.protocol" download class="text-blue-400">{{
          homework_info.protocol.split('/').at(-1)
        }}</a>
      </div>
    </div>
    <div class="item w-1/1 mt-4">
      <div class="label font-600">提交作业：</div>
      <div class="content mt-4">
        <el-button type="primary" @click="uploadProtocol">上传作业</el-button>
        <div v-if="protocol" class="mt-2">
          <a :href="protocol" class="text-blue-400">{{ protocol.split('/').at(-1) }}</a>
        </div>
      </div>
      <div class="content mt-4 text-center">
        <el-button type="primary" @click="toCommit">提交作业</el-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { getHomeworkDetail, uploadFile } from '../createhomework/createHomework.api'
import { commitHomework } from './commitHomework.api'
import { Info } from './commitHomework'
import { reactive, ref, Ref } from 'vue'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const homework_info: Partial<Info> = reactive({})
const protocol = ref('')
const loading = ref(false)
const file: Ref<File | null> = ref(null)

getDetail()

function getDetail() {
  getHomeworkDetail({ homework_id: route.query.id }).then(res => {
    Object.assign(homework_info, res)
  })
}
function uploadProtocol() {
  loading.value = true
  file.value = null
  const input = document.createElement('input')
  input.type = 'file'
  input.click()
  input.onchange = () => {
    // 拿到文件对象 --- 用于上传
    file.value = input.files![0]
    const form = new FormData()
    form.append('enctype', 'multipart/form-data')
    // form.append('type', '3')
    form.append('file', new Blob([file.value]), file.value.name)
    uploadFile(form).then((res: any) => {
      protocol.value = res.url
      loading.value = false
      ElMessage.success('上传成功！')
    })
  }
}

function toCommit() {
  if (!protocol.value) return ElMessage.error('作业不可为空！')
  const postData = {
    homework_id: route.query.id,
    type: +route.query.type!,
    class_id: JSON.parse(localStorage.getItem('userinfo')!).class_id,
    account: JSON.parse(localStorage.getItem('userinfo')!).account,
    protocol: protocol.value
  }
  commitHomework(postData).then(res => {
    if (res) {
      ElMessage.success('提交成功！')
      router.push('/home/homework/homeworklist')
    }
  })
}
</script>
