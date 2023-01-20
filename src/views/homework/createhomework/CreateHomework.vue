<template>
  <div class="bg-white p-4">
    <div class="font-700" style="font-size: 1.2vw">发布作业</div>
    <div class="item flex items-center mt-6 w-1/3">
      <div class="label w-1/3">作业标题：</div>
      <div class="content w-2/3">
        <el-input v-model="myform.title" />
      </div>
    </div>
    <div class="item flex items-center mt-6 w-1/3">
      <div class="label w-1/3">作业内容：</div>
      <div class="content w-2/3">
        <el-input type="textarea" v-model="myform.info" autosize />
      </div>
    </div>
    <div class="item flex items-center mt-6 w-1/3">
      <div class="label w-1/3">截止日期：</div>
      <div class="content w-2/3">
        <el-date-picker
          v-model="myform.date"
          type="datetime"
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="Select date and time"
          style="width: 100%"
        />
      </div>
    </div>
    <div class="item flex items-center mt-6 w-1/3">
      <div class="label w-1/3">面向班级：</div>
      <div class="content w-2/3">
        <el-select v-model="myform.class_id" placeholder="选择班级" class="w-1/1">
          <el-option label="2019级信息与科学1班" :value="101" />
          <el-option label="2019级信息与科学2班" :value="102" />
          <el-option label="2019级信息与科学3班" :value="103" />
          <el-option label="2019级信息与科学4班" :value="104" />
        </el-select>
      </div>
    </div>
    <div class="item flex mt-6 w-1/3">
      <div class="label w-1/3">附件上传：</div>
      <div class="content w-2/3 flex flex-col">
        <el-button type="primary" @click="uploadProtocol">点击上传</el-button>
        <a v-if="myform.protocol" :href="myform.protocol" download class="text-blue-400 mt-2">{{
          myform.protocol.split('/').at(-1)
        }}</a>
      </div>
    </div>
    <div class="item flex items-center mt-6 w-1/3">
      <div class="label w-1/3"></div>
      <div class="content w-2/3">
        <el-button type="primary" @click="toPublish">{{ route.query.id ? '修改作业' : '发布作业' }}</el-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, Ref } from 'vue'
import { MyForm } from './createHomework'
import { getHomeworkDetail, uploadFile, saveOrUpdate } from './createHomework.api'
import { useRoute, useRouter } from 'vue-router'
import { dayjs, ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const myform: Partial<MyForm> = reactive({})
const file: Ref<File | null> = ref(null)

if (route.query.id) {
  getDetail()
}

function getDetail() {
  getHomeworkDetail({ homework_id: route.query.id }).then(res => {
    Object.assign(myform, res)
  })
}

function uploadProtocol() {
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
      myform.protocol = res.url
      ElMessage.success('上传成功！')
    })
  }
  input.on
}

function toPublish() {
  myform.date = dayjs(myform.date).format('YYYY-MM-DD HH:mm:ss')
  myform.account = JSON.parse(localStorage.getItem('userinfo')!).account

  saveOrUpdate(myform).then(res => {
    if (res) {
      ElMessage.success('发布成功！')
      router.push('/home/homework/homeworklist')
    }
  })
}
</script>
<style lang="scss" scoped>
:deep(.el-input__wrapper) {
  width: 100%;
}
</style>
