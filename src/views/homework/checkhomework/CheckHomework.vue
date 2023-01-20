<template>
  <div class="bg-white p-4">
    <BasicTable
      v-loading="loading"
      :data="doneList"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="pageSizeOption"
      :total="total"
      background
      hide-on-single-page
      stripe
      layout="prev, pager, next, jumper, sizes, total"
      @current-change="getDone"
      @size-change="getDone"
      @reload="getDone"
    >
      <template #tableTitle>
        <div class="flex">
          <div class="flex items-center">
            <span>选择班级：</span>
            <el-select v-model="class_id" placeholder="选择班级" @change="getDone">
              <el-option label="2019级信息与科学1班" :value="101" />
              <el-option label="2019级信息与科学2班" :value="102" />
              <el-option label="2019级信息与科学3班" :value="103" />
              <el-option label="2019级信息与科学4班" :value="104" />
              <el-option label="全部" :value="0" />
            </el-select>
          </div>
          <div class="flex items-center ml-4">
            <span class="w-1/3">作业ID：</span>
            <el-input v-model="homework_id" @keyup.enter="getDone" />
          </div>
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
          <span v-if="item.prop === 'status'">{{ row.status === 1 ? '未批改' : '已批改' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="操作" label="操作" align="center">
        <template #default="{ row }">
          <el-button link type="primary" @click="router.push(`/home/homework/homeworkinfo?id=${row.id}`)">{{ row.status === 1 ? '批改' : '修改' }}</el-button>
        </template>
      </el-table-column>
    </BasicTable>
  </div>
</template>
<script setup lang="ts">
import { getDoneList } from '../homeworklist/homeworkList.api'
import { DoneItem } from '../homeworklist/homeworkList'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import BasicTable from '/@/components/Table/BasicTable.vue'
import { columns } from './checkHomework.data'

const router = useRouter()
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const pageSizeOption = reactive([10, 30, 50, 100])
const total = ref(0)
const class_id = ref(0)
const homework_id = ref('')
const doneList: DoneItem[] = reactive([])

getDone()

function getDone() {
  const postData = {
    page: currentPage.value,
    pageSize: pageSize.value,
    class_id: +class_id.value,
    homework_id: +homework_id.value
  }
  getDoneList(postData).then((res: any) => {
    doneList.length = 0
    doneList.push(...res.items)
  })
}
</script>
