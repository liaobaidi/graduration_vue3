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
      <el-table-column
        v-for="(item, index) in columns"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :align="item.align"
      >
        <template #default="{ row }">
          <div v-if="item.prop === 'course'">
            {{ courseList[row.course] }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-button v-if="showAction(row)" link type="danger" @click="toDelete(row.id)">删除</el-button>
          <el-button v-else link type="primary" @click="toCancel(row)">取消预约</el-button>
        </template>
      </el-table-column>
    </BasicTable>
  </div>
</template>
<script setup lang="ts">
import BasicTable from '/@/components/Table/BasicTable.vue'
import { columns, courseList } from './appointmentList.data'
import { reactive, ref } from 'vue'
import { PostData } from '/@/types'
import { DataItem } from './appointmentList'
import { getAppointList, cancelAppoint, appointDelete } from './appointmentList.api'
import { dayjs, ElMessage } from 'element-plus'

const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const pageSizeOption = reactive([10, 30, 50, 100])
const total = ref(0)
const dataSource: DataItem[] = reactive([])

getList()

function getList() {
  loading.value = true
  const postData: PostData = {
    page: currentPage.value,
    pageSize: pageSize.value
  }
  getAppointList(postData).then((res: any) => {
    total.value = res.total
    dataSource.length = 0
    dataSource.push(...res.items)
    loading.value = false
  })
}

function toDelete(id: number) {
  const postData = {
    id
  }
  appointDelete(postData).then(res => {
    if (res) {
      ElMessage.success('删除成功！')
      getList()
    }
  })
}

function toCancel(row: DataItem) {
  const postData = {
    id: row.id,
    name: row.name,
    time: row.time,
    key: row.course
  }
  cancelAppoint(postData).then((res) => {
    if(res) {
      ElMessage.success('取消成功！')
      getList()
    }
  })
} 

function showAction(row: DataItem) {
  return +new Date(dayjs().format('YYYY-MM-DD')) > +new Date(row.time)
}
</script>
