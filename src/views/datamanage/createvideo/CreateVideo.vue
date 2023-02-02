<template>
  <div class="bg-white p-4" v-loading="loading">
    <div class="item flex w-1/3 items-center">
      <div class="label w-1/3">视频名称：</div>
      <div class="content w-2/3">
        <el-input v-model="name" />
      </div>
    </div>
    <div class="item flex w-1/3 mt-4">
      <div class="label w-1/3">上传封面：</div>
      <div class="content w-2/3">
        <el-image v-if="cover" :src="cover" @click="to_uploadPicture"></el-image>
        <el-button v-else type="primary" @click="to_uploadPicture">点击上传</el-button>
      </div>
    </div>
    <div class="item flex w-1/3 mt-4">
      <div class="label w-1/3">上传视频：</div>
      <div class="content w-2/3">
        <video v-if="url" controls :src="url" class="mb-4"></video>
        <el-button type="primary" @click="to_uploadVideo">{{ url ? '点击修改' : '点击上传' }}</el-button>

        <!-- <span v-if="file_vid" class="text-blue-400">{{ file_vid.name }}</span> -->
      </div>
    </div>
    <div class="item flex w-1/3 items-center mt-4">
      <div class="label w-1/3"></div>
      <div class="content w-2/3">
        <el-button :loading="loading" type="primary" @click="create">创建</el-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { uploadVideo, createVideo, uploadPicture, getVideoInfo } from './createVideo.api'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'

interface VideoInfo {
  id: number
  account: string
  name: string
  url: string
  cover: string
  date: string
}

const route = useRoute()
const router = useRouter()
const name = ref('')
const url = ref('')
const cover = ref('')
const loading = ref(false)
const file_pic = ref<File | null>(null)
const file_vid = ref<File | null>(null)

if (route.query.id) {
  getVideoInfo({ id: route.query.id }).then((res: any) => {
    cover.value = res.cover
    name.value = res.name
    url.value = res.url
  })
}

function to_uploadVideo() {
  const input = document.createElement('input')
  input.type = 'file'
  input.click()
  input.onchange = () => {
    // 拿到文件对象 --- 用于上传
    file_vid.value = input.files![0]
    const form = new FormData()
    form.append('enctype', 'multipart/form-data')
    // form.append('type', '3')
    form.append('file', new Blob([file_vid.value]), file_vid.value.name)
    loading.value = true
    uploadVideo(form)
      .then((res: any) => {
        url.value = res.url
        ElMessage.success('上传成功！')
      })
      .finally(() => (loading.value = false))
  }
}

function to_uploadPicture() {
  const input = document.createElement('input')
  input.type = 'file'
  input.click()
  input.onchange = () => {
    // 拿到文件对象 --- 用于上传
    file_pic.value = input.files![0]
    const form = new FormData()
    form.append('enctype', 'multipart/form-data')
    // form.append('type', '3')
    form.append('file', new Blob([file_pic.value]), file_pic.value.name)
    loading.value = true
    uploadPicture(form)
      .then((res: any) => {
        cover.value = res.url
        ElMessage.success('上传成功！')
      })
      .finally(() => (loading.value = false))
  }
}

function create() {
  const postData: Partial<VideoInfo> = {
    name: name.value,
    url: url.value,
    cover: cover.value
  }
  if(route.query.id) {
    postData.id = +route.query.id
  }
  createVideo(postData).then(res => {
    if (res) {
      ElMessage.success('创建成功！')
      router.push('/home/datamanage/videolist')
    }
  })
}
</script>
