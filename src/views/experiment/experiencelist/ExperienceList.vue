<template>
  <div class="bg-white p-4">
    <BasicTable
      v-loading="loading"
      :data="dataSource"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="pageSizeOption"
      :total="total"
      background
      hide-on-single-page
      stripe
      layout="prev, pager, next, jumper, sizes, total"
      @current-change="getList"
      @size-change="getList"
      @reload="getList"
    >
      <template #tableTitle>
        <div class="flex items-center justify-between">
          <div class="mr-6 flex items-center">
            <span class="w-1/3">选择ID：</span>
            <el-input v-model="id" @keyup.enter="getList" />
            <el-button type="primary" class="ml-4" @click="getList">搜索</el-button>
          </div>
          <el-button v-if="identity !== 'student'" type="primary" @click="show = true">发布实验</el-button>
        </div>
      </template>
      <el-table-column
        v-for="(item, index) in columns"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :align="item.align"
      >
        <template #default="{ row }">
          <a v-if="item.prop === 'protocol' && row.protocol" :href="row.protocol" download class="text-blue-400">{{
            row.protocol.split('/').at(-1)
          }}</a>
        </template>
      </el-table-column>
    </BasicTable>
  </div>
  <el-dialog v-model="show" title="发布实验" center width="33%" @closed="myform.protocol = ''">
    <div class="p-4">
      <div class="item flex items-center">
        <div class="label w-1/3">实验名称：</div>
        <div class="content w-2/3">
          <el-input v-model="myform.name" />
        </div>
      </div>
      <div class="item flex mt-4">
        <div class="label w-1/3">上传资料：</div>
        <div class="content w-2/3">
          <el-button type="primary" @click="toUpload">点击上传</el-button>
          <div v-if="myform.protocol" class="mt-2 text-blue-400 cursor-pointer">
            {{ myform.protocol.split('/').at(-1) }}
          </div>
        </div>
      </div>
      <div class="item flex items-center mt-4">
        <div class="label w-1/3"></div>
        <div class="content w-2/3">
          <el-button type="primary" @click="toPublish">发布</el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import BasicTable from '/@/components/Table/BasicTable.vue'
import { Ref, ref, reactive } from 'vue'
import { getExperienceList, publishExperience, uploadFile } from './experienceList.api'
import { DataItem } from './experienceList'
import { PostData } from '/@/types'
import { columns } from './experienceList.data'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const pageSizeOption = reactive([10, 30, 50, 100])
const total = ref(0)
const dataSource: DataItem[] = reactive([])
const identity = JSON.parse(localStorage.getItem('userinfo')!).identity
const show = ref(false)
const myform = reactive({
  name: '',
  protocol: ''
})
const file: Ref<File | null> = ref(null)
const id = ref<number | string>('')

getList()

function getList() {
  loading.value = true
  const postData: PostData = {
    page: currentPage.value,
    pageSize: pageSize.value
  }
  if (id.value) {
    postData.id = id.value
  }
  getExperienceList(postData).then((res: any) => {
    total.value = res.total
    dataSource.length = 0
    dataSource.push(...res.items)
    loading.value = false
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
    uploadFile(form).then((res: any) => {
      myform.protocol = res.url
      ElMessage.success('上传成功！')
    })
  }
}

function toPublish() {
  if (!myform.name) return ElMessage.error('实验名称不可为空！')
  publishExperience(myform).then(res => {
    if (res) {
      ElMessage.success('发布成功！')
      show.value = false
      getList()
    }
  })
}
</script>
