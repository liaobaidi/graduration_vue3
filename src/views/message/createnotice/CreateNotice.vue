<template>
  <div class="bg-white p-4">
    <div class="font-700" style="font-size: 1.2vw">创建公告</div>
    <div class="item flex items-center mt-4 w-1/4">
      <div class="label w-1/4">标题：</div>
      <div class="content w-3/4">
        <el-input v-model="noticeInfo.title" placeholder="建议输入30个字符以内" />
      </div>
    </div>
    <div class="item flex mt-4 w-1/4">
      <div class="label w-1/4">内容：</div>
      <div class="content w-3/4">
        <el-input type="textarea" v-model="noticeInfo.info" autosize />
      </div>
    </div>
    <div class="item flex mt-4 w-1/4">
      <div class="label w-1/4">附件：</div>
      <div class="content w-3/4">
        <el-button type="primary" @click="toUpload">上传附件</el-button>
        <div class="mt-2 text-blue-500 cursor-pointer">{{ noticeInfo.protocol?.split('/').at(-1) }}</div>
      </div>
    </div>
    <div class="item flex items-center mt-4 w-1/4">
      <div class="label w-1/4"></div>
      <div class="content w-3/4">
        <el-button type="primary" @click="publish">发布</el-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { DataItem } from '../noticelist/noticeList'
import { reactive, Ref, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { uploadProtocol, save } from './createNotice.api'
import { getNoticeInfo } from '../noticeinfo/noticeInfo.api'
import { dayjs, ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const noticeInfo: Partial<DataItem> = reactive({})
const file: Ref<File | null> = ref()

if (route.query.id) {
  getDetail()
}

function getDetail() {
  const postData = {
    id: route.query.id
  }
  getNoticeInfo(postData).then(res => {
    Object.assign(noticeInfo, res)
  })
}
function toUpload() {
  file.value = null
  const input = document.createElement('input')
  input.type = 'file'
  input.click()
  input.onchange = () => {
    // 拿到文件对象 --- 用于上传
    file.value = input.files![0]
    if (/image/g.test(file.value.type)) {
      ElMessage.error('不可以上传图片！')
      return
    }
    const form = new FormData()
    form.append('enctype', 'multipart/form-data')
    // form.append('type', '3')
    form.append('file', new Blob([file.value]), file.value.name)
    uploadProtocol(form).then((res: any) => {
      noticeInfo.protocol = res.url
      ElMessage.success('上传成功！')
    })
  }
}

function publish() {
  if (noticeInfo.title) {
    if (noticeInfo.title.length > 30) {
      ElMessage.error('标题的长度不可以超过30个字符！')
      return
    }
  } else {
    ElMessage.error('标题不可以为空！')
    return
  }
  if (!noticeInfo.info) {
    ElMessage.error('内容不可以为空！')
    return
  }
  noticeInfo.date = dayjs().format('YYYY-MM-DD HH:mm:ss')
  noticeInfo.author = JSON.parse(localStorage.getItem('userinfo')!).username
  noticeInfo.account = JSON.parse(localStorage.getItem('userinfo')!).account
  save(noticeInfo).then((res) => {
    if(res) {
      ElMessage.success('发布成功！')
      router.push('/home/message/noticelist')
    }
  })
}
</script>
