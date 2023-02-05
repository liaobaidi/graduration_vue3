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
        <div class="flex items-center w-2/5">
          <span class="w-1/4">关键词：</span>
          <el-input v-model="keyWord" />
          <el-button class="ml-4" type="primary" @click="getList">搜索</el-button>
          <el-button v-if="identity === 'admin'" class="ml-4" type="primary" @click="router.push(`/home/datamanage/createfile`)">上传资料</el-button>
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
          <el-button v-if="item.prop === 'url'" link type="primary" @click="to_download(row)">{{ row.url.split('/').at(-1) }}</el-button>
        </template>
      </el-table-column>
      <el-table-column v-if="identity === 'admin'" prop="action" label="操作" align="center">
        <template #default="{ row }">
          <el-button link type="primary" @click="router.push(`/home/datamanage/createFile?id=${row.id}`)">修改</el-button>
          <el-popconfirm title="您确定删除?" @confirm="to_delete(row.id)">
            <template #reference>
              <el-button v-if="identity === 'admin'" link type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </BasicTable>
  </div>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { getFileList, deleteFile, downloadFile } from './fileList.api'
import { columns } from './fileList.data'

interface FileInfo {
  id: number
  name: string
  url: string
  download_count: number
}

const router = useRouter()
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const pageSizeOption = reactive([10, 30, 50, 100])
const total = ref(0)
const dataSource: FileInfo[] = reactive([])
const keyWord = ref('')
const identity = JSON.parse(localStorage.getItem('userinfo')!).identity

getList()

function getList() {
  loading.value = true
  const postData = {
    page: currentPage.value,
    pageSize: pageSize.value,
    keyWord: keyWord.value
  }
  getFileList(postData).then((res: any) => {
    total.value = res.total
    dataSource.length = 0
    dataSource.push(...res.items)
    loading.value = false
  })
}

function to_delete(id: number) {
  deleteFile({ id }).then(res => {
    if (res) {
      ElMessage.success('删除成功！')
      getList()
    }
  })
}

function to_download(item: FileInfo) {
  downloadFile({ id: item.id }).then(res => {
    if (res) {
      const a = document.createElement('a')
      a.setAttribute('download', item.name)
      a.href = item.url
      a.click()
    }
  })
}
</script>
