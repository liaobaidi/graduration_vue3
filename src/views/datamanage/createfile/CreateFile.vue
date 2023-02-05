<template>
  <div class="bg-white p-8">
    <div class="item flex items-center w-1/3">
      <div class="label w-1/3">名称：</div>
      <div class="content w-2/3">
        <el-input v-model="fileInfo.name" />
      </div>
    </div>
    <div class="item flex mt-6 w-1/3">
      <div class="label w-1/3">上传文件：</div>
      <div class="content w-2/3">
        <el-button type="primary" v-loading="loading" @click="to_upload">点击上传</el-button>
        <div v-if="fileInfo.url" class="mt-4 text-blue-400">{{ fileInfo.url.split('/').at(-1) }}</div>
      </div>
    </div>
    <div class="item flex items-center mt-6 w-1/3">
      <div class="label w-1/3"></div>
      <div class="content w-2/3">
        <el-button type="primary" v-loading="loading" @click="to_addOrUpdate">创建</el-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getFileDetail, addOrUpdate, uploadProtocol } from './createFile.api'

interface FileInfo {
  id: number
  name: string
  url: string
  download_count: number
}

const route = useRoute()
const router = useRouter()
const fileInfo: Partial<FileInfo> = reactive({})
const upload_file = ref<File | null>(null)
const loading = ref(false)

if (route.query.id) {
  getFileDetail({ id: +route.query.id }).then(res => {
    Object.assign(fileInfo, res)
  })
}

function to_addOrUpdate() {
  const postData: Partial<FileInfo> = {
    url: fileInfo.url,
    name: fileInfo.name
  }
  if (route.query.id) {
    postData.id = +route.query.id
  }
  addOrUpdate(postData).then(res => {
    if (res) {
      ElMessage.success('创建成功！')
      router.push('/home/datamanage/filelist')
    }
  })
}

function to_upload() {
  upload_file.value = null
  const input = document.createElement('input')
  input.type = 'file'
  input.click()
  input.onchange = () => {
    upload_file.value = input.files![0]
    const form = new FormData()
    form.append('enctype', 'multipart/form-data')
    form.append('file', new Blob([upload_file.value]), upload_file.value.name)
    loading.value = true
    uploadProtocol(form).then((res: any) => {
      fileInfo.url = res.url
      loading.value = false
    })
  }
}
</script>
