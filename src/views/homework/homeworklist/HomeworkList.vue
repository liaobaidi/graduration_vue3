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
        <div v-if="identity !== 'student'">
          <span>选择班级：</span>
          <el-select v-model="class_id" placeholder="选择班级" @change="getList">
            <el-option label="2019级信息与科学1班" :value="101" />
            <el-option label="2019级信息与科学2班" :value="102" />
            <el-option label="2019级信息与科学3班" :value="103" />
            <el-option label="2019级信息与科学4班" :value="104" />
            <el-option label="全部" :value="0" />
          </el-select>
          <el-button type="primary" class="ml-4" @click="router.push('/home/homework/createhomework')"
            >发布作业</el-button
          >
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
          <div v-if="item.prop === 'protocol'">
            <a v-if="row.protocol !== 'undefined'" class="text-blue-400" :href="row.protocol" download>附件</a>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="操作" label="操作" align="center">
        <template #default="{ row }">
          <el-button
            v-if="identity !== 'student'"
            link
            type="primary"
            @click="router.push(`/home/homework/createhomework?id=${row.id}`)"
            >修改</el-button
          >
          <div v-else>
            <div v-if="+new Date(row.date) > +new Date()">
              <el-button
                v-if="showCommit(row)"
                link
                type="primary"
                @click="router.push(`/home/homework/commithomework?id=${row.id}&type=2`)"
                >已提交</el-button
              >
              <el-button
                v-else
                link
                type="primary"
                @click="router.push(`/home/homework/commithomework?id=${row.id}&type=1`)"
                >去提交</el-button
              >
            </div>
            <div v-else>
              <el-button v-if="!showCommit(row)" link type="danger">已截止</el-button>
              <el-button v-if="showCommit(row)" link type="primary" @click="toInfo(showStatus(row), row)">{{ showStatus(row) ? '未批改' : '已批改' }}</el-button>
            </div>
          </div>
        </template>
      </el-table-column>
    </BasicTable>
  </div>
</template>
<script setup lang="ts">
import { columns } from './homeworkList.data'
import { getHomeworkList, getDoneList } from './homeworkList.api'
import { DataItem, DoneItem } from './homeworkList'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import BasicTable from '/@/components/Table/BasicTable.vue'

const router = useRouter()
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const pageSizeOption = reactive([10, 30, 50, 100])
const total = ref(0)
const dataSource: DataItem[] = reactive([])
const class_id = ref(0)
const identity = JSON.parse(localStorage.getItem('userinfo')!).identity
const account = JSON.parse(localStorage.getItem('userinfo')!).account
const doneList: DoneItem[] = reactive([])

getList()
getDone()

function getList() {
  loading.value = true
  const postData = {
    page: currentPage.value,
    pageSize: pageSize.value,
    class_id: JSON.parse(localStorage.getItem('userinfo')!).class_id || class_id.value
  }
  getHomeworkList(postData).then((res: any) => {
    total.value = res.total
    dataSource.length = 0
    dataSource.push(...res.items)
    loading.value = false
  })
}

function getDone() {
  if (!JSON.parse(localStorage.getItem('userinfo')!).class_id) return
  const postData = {
    page: 1,
    pageSize: 5000,
    class_id: JSON.parse(localStorage.getItem('userinfo')!).class_id
  }
  getDoneList(postData).then((res: any) => {
    doneList.length = 0
    doneList.push(...res.items)
  })
}

function showCommit(row: DataItem) {
  const res = doneList.some((item: DoneItem) => {
    if (row.id === item.homework_id && account === item.account) {
      return true
    }
  })
  return res
}

function showStatus(row: DataItem) {
  const res = doneList.some((item: DoneItem) => {
    if (row.id === item.homework_id && account === item.account && item.status === 1) {
      return true
    }
  })
  return res
}

function toInfo(flag: boolean, row: DataItem) {
  if(flag) {
    // 未批改
    return
  }
  router.push(`/home/homework/homeworkinfo?homework_id=${row.id}`)
}
</script>
