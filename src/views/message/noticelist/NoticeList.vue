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
        <el-button v-if="identity !== 'student'" type="primary" @click="router.push('/home/message/createnotice')">发布公告</el-button>
      </template>
      <el-table-column
        v-for="(item, index) in columns"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :align="item.align"
      >
        <template #default="{ row }">
          <div v-if="item.prop === 'protocol' && row.protocol">
            <a :href="row.protocol" download class="text-blue-400">点击下载</a>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120" align="center">
        <template #default="{ row }">
          <el-button v-if="row.account === account" link type="primary" size="small" @click="router.push(`/home/message/createnotice?id=${row.id}`)">修改</el-button>
          <el-button link type="primary" size="small" @click="router.push(`/home/message/noticeinfo?id=${row.id}`)">详情</el-button>
        </template>
      </el-table-column>
    </BasicTable>
  </div>
</template>
<script setup lang="ts">
import BasicTable from '/@/components/Table/BasicTable.vue'
import { columns } from './noticeList.data'
import { getNoticeList } from './noticeList.api'
import { reactive, ref, Ref } from 'vue'
import { useRouter } from 'vue-router'
import { PostData } from '/@/types'
import { DataItem } from './noticeList'

const router = useRouter()
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const pageSizeOption = reactive([10, 30, 50, 100])
const total = ref(0)
const dataSource: DataItem[] = reactive([])
const identity = JSON.parse(localStorage.getItem('userinfo')!).identity
const account = JSON.parse(localStorage.getItem('userinfo')!).account

getList()

function getList() {
  loading.value = true
  const postData: PostData & Partial<DataItem> = {
    page: currentPage.value,
    pageSize: pageSize.value
  }
  getNoticeList(postData).then((res: any) => {
    total.value = res.total
    dataSource.length = 0
    dataSource.push(...res.items)
    loading.value = false
  })
}
</script>
<style scoped lang="scss">
:deep(.el-table__cell) {
  .cell {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
