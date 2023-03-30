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
        <div class="flex items-center">
          <span>选择时间：</span>
          <el-date-picker v-model="time" type="date" placeholder="Pick a day" @change="getList" />
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
          <div v-if="item.prop !== 'ID' && item.prop !== 'time' && item.prop !== 'name'">
            <div v-if="item.prop === 'one_two'">
              <div v-if="row.one_two">
                <el-button v-if="showStatus(item, row)" link type="danger" size="small" @click="showInfo(item, row)"
                  >上课占用</el-button
                >
                <el-button v-else link type="primary" size="small" @click="appoint(row, item.prop)"
                  >可预约: {{ row.one_two }}</el-button
                >
              </div>

              <div v-else>
                <el-button v-if="showStatus(item, row)" link type="danger" size="small" @click="showInfo(item, row)"
                  >上课占用</el-button
                >
                <el-button v-else link type="danger" size="small">已约满</el-button>
              </div>
            </div>
            <div v-if="item.prop === 'three_four'">
              <div v-if="row.three_four">
                <el-button v-if="showStatus(item, row)" link type="danger" size="small" @click="showInfo(item, row)"
                  >上课占用</el-button
                >
                <el-button v-else link type="primary" size="small" @click="appoint(row, item.prop)"
                  >可预约: {{ row.three_four }}</el-button
                >
              </div>
              <div v-else>
                <el-button v-if="showStatus(item, row)" link type="danger" size="small" @click="showInfo(item, row)"
                  >上课占用</el-button
                >
                <el-button v-else link type="danger" size="small">已约满</el-button>
              </div>
            </div>
            <div v-if="item.prop === 'five'">
              <div v-if="row.five">
                <el-button v-if="showStatus(item, row)" link type="danger" size="small" @click="showInfo(item, row)"
                  >上课占用</el-button
                >
                <el-button v-else link type="primary" size="small" @click="appoint(row, item.prop)"
                  >可预约: {{ row.five }}</el-button
                >
              </div>
              <div v-else>
                <el-button v-if="showStatus(item, row)" link type="danger" size="small" @click="showInfo(item, row)"
                  >上课占用</el-button
                >
                <el-button v-else link type="danger" size="small">已约满</el-button>
              </div>
            </div>
            <div v-if="item.prop === 'six_seven'">
              <div v-if="row.six_seven">
                <el-button v-if="showStatus(item, row)" link type="danger" size="small" @click="showInfo(item, row)"
                  >上课占用</el-button
                >
                <el-button v-else link type="primary" size="small" @click="appoint(row, item.prop)"
                  >可预约: {{ row.six_seven }}</el-button
                >
              </div>
              <div v-else>
                <el-button v-if="showStatus(item, row)" link type="danger" size="small" @click="showInfo(item, row)"
                  >上课占用</el-button
                >
                <el-button v-else link type="danger" size="small">已约满</el-button>
              </div>
            </div>
            <div v-if="item.prop === 'eight_nine'">
              <div v-if="row.eight_nine">
                <el-button v-if="showStatus(item, row)" link type="danger" size="small" @click="showInfo(item, row)"
                  >上课占用</el-button
                >
                <el-button v-else link type="primary" size="small" @click="appoint(row, item.prop)"
                  >可预约: {{ row.eight_nine }}</el-button
                >
              </div>
              <div v-else>
                <el-button v-if="showStatus(item, row)" link type="danger" size="small" @click="showInfo(item, row)"
                  >上课占用</el-button
                >
                <el-button v-else link type="danger" size="small">已约满</el-button>
              </div>
            </div>
            <div v-if="item.prop === 'ten_twi'">
              <div v-if="row.ten_twi">
                <el-button v-if="showStatus(item, row)" link type="danger" size="small" @click="showInfo(item, row)"
                  >上课占用</el-button
                >
                <el-button v-else link type="primary" size="small" @click="appoint(row, item.prop)"
                  >可预约: {{ row.ten_twi }}</el-button
                >
              </div>
              <div v-else>
                <el-button v-if="showStatus(item, row)" link type="danger" size="small" @click="showInfo(item, row)"
                  >上课占用</el-button
                >
                <el-button v-else link type="danger" size="small">已约满</el-button>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
    </BasicTable>
  </div>
  <el-dialog v-model="appointDialog" title="预约实验室" width="30%" @before-close="appointObj.appoint_count = 1">
    <div class="flex items-center">
      <span class="w-1/3">预约台数：</span>
      <el-input v-model="appointObj.appoint_count" class="w-2/3" placeholder="请输入预约设备数量" type="number" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="appointDialog = false">取消</el-button>
        <el-button type="primary" @click="toAppoint">预约</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="infoVisible" title="详情" center width="30%">
    <div>
      <div>
        <span>课程：</span>
        <span>{{ courseInfo[0].course_name }}</span>
      </div>
      <div class="mt-2">
        <span>老师：</span>
        <span>{{ courseInfo[0].username }}</span>
      </div>
      <div class="mt-2">
        <span>班级：</span>
        <span>{{ courseInfo.map(item => item.class_view).join(',') }}</span>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, inject } from 'vue'
import BasicTable from '/@/components/Table/BasicTable.vue'
import { columns } from './experimentList.data'
import { getExprimentList, appointExperiment } from './experiment.api'
import { DataItem, AppointItem, AppointObj } from './experiment'
import { ElMessage } from 'element-plus'
import { getCourseList } from '../courselist/courselist.api'

const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const pageSizeOption = reactive([10, 30, 50, 100])
const total = ref(0)
const dataSource: DataItem[] = reactive([])
const time = ref('')
const dayjs = inject('dayjs')
const appointList: AppointItem[] = reactive([])
const appointDialog = ref(false)
const appointObj: Partial<AppointObj> = reactive({})
const courseList: Course[] = reactive([])
const infoVisible = ref(false)
const courseInfo: Course[] = reactive([])

getList()
getCourse()

function getList() {
  loading.value = true
  const postData = {
    page: currentPage.value,
    pageSize: pageSize.value,
    time: time.value ? dayjs(time.value).format('YYYY-MM-DD') : ''
  }
  getExprimentList(postData)
    .then((res: any) => {
      total.value = res.total
      dataSource.length = 0
      dataSource.push(...res.items)
    })
    .finally(() => {
      loading.value = false
    })
}
function appoint(row: DataItem, key: string) {
  appointDialog.value = true
  appointObj.ID = row.ID
  appointObj.key = key
}
function toAppoint() {
  if (!appointObj.appoint_count) {
    ElMessage.error('设备数量填写有误！')
    return
  }
  appointExperiment(appointObj).then(res => {
    if (res) {
      ElMessage.success('预约成功！')
      appointDialog.value = false
      getList()
    }
  })
}
function showInfo(item, row: DataItem) {
  courseInfo.length = 0
  for (let i = 0; i < courseList.length; i++) {
    if (
      courseList[i].time === row.time &&
      item.prop === courseList[i].course_time &&
      row.name === courseList[i].experiment_id
    ) {
      courseInfo.push(courseList[i])
    }
  }
  infoVisible.value = true
}

function showStatus(item, row: DataItem) {
  for (let i = 0; i < courseList.length; i++) {
    if (
      courseList[i].time === row.time &&
      item.prop === courseList[i].course_time &&
      row.name === courseList[i].experiment_id
    ) {
      return true
    }
  }
  return false
}

function getCourse() {
  getCourseList({ page: 1, pageSize: 100000 }).then((res: any) => {
    courseList.length = 0
    courseList.push(...res.items)
  })
}
</script>
