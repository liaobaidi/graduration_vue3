<template>
  <div class="bg-white p-3">
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
      @current-change="init"
      @size-change="init"
      @reload="init"
    >
      <template #tableTitle>
        <div class="w-1/1 flex items-center">
          <div class="flex items-center">
            <span>课程：</span>
            <div>
              <el-select v-model="course_id" placeholder="请选择" @change="init">
                <el-option v-for="item in courseOption" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
          </div>
          <div class="flex items-center ml-4">
            <span>班级：</span>
            <div>
              <el-select v-model="class_id" placeholder="请选择" @change="init">
                <el-option v-for="item in classOption" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
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
        <template #default="{ row }" v-if="item.prop === 'action'">
          <el-button type="primary" link @click="toOrder(row)">{{ isOrder(row) }}</el-button>
        </template>
      </el-table-column>
    </BasicTable>
  </div>
  <el-dialog v-model="showChange" title="评分" center width="30%" :before-close="reset">
    <div class="flex items-center">
      <span class="w-1/3">分数：</span>
      <el-input v-model="currentStudent.score" />
    </div>
    <div class="flex items-center justify-center mt-4">
      <el-button type="primary" @click="changeGrade">评分</el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts" setup>
import BasicTable from '/@/components/Table/BasicTable.vue'
import { ref, reactive } from 'vue'
import { getTerminalList, changeTerminalGrade, getTerminalCount } from './terminalCount.api'
import { getCourseListTeach } from '../signincount/signinCount.api'
import { getClassList } from '/@/api/common'
import { ElMessage } from 'element-plus'

interface DataItem {
  [key: string]: string | number
}

const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const pageSizeOption = reactive([10, 30, 50, 100])
const total = ref(0)
const dataSource: DataItem[] = reactive([])
const class_id = ref('')
const course_id = ref('')
const columns: DataItem[] = reactive([])
const classOption: CourseOption[] = reactive([])
const courseOption: CourseOption[] = reactive([])
const scoreList: Score[] = reactive([])
const currentStudent: DataItem = reactive({})
const showChange = ref(false)

init()

const reset = (done?: Function) => {
  Object.keys(currentStudent).forEach(key => {
    currentStudent[key] = ''
  })
  done && done()
  console.log("reset", currentStudent);
}

const toOrder = (row: DataItem) => {
  Object.assign(currentStudent, row)
  showChange.value = true
}

const isOrder = (row: DataItem) => {
  if (scoreList.map(it => it.account).includes(row.account as string)) {
    const index = dataSource.findIndex(it => it.account === row.account)
    const scoreIndex = scoreList.findIndex(it => it.account === row.account)
    dataSource[index]['action'] = scoreList[scoreIndex].score
    dataSource[index]['scoreId'] = scoreList[scoreIndex].id
    return scoreList[scoreIndex].score
  }
  return '评分'
}

function init() {
  getList()
  getGrade()
}

function changeGrade() {
  if(!currentStudent.score && currentStudent.score !== 0) {
    ElMessage.error('请填写分数！')
    return
  }
  const postData = {
    account: currentStudent.account,
    course_id: currentStudent.course_id,
    score: currentStudent.score,
    class_id: currentStudent.class_id
  }
  if (currentStudent.scoreId) {
    postData.id = currentStudent.scoreId
  }
  changeTerminalGrade(postData).then(res => {
    if (res) {
      ElMessage.success('success')
      reset()
      showChange.value = false
      getGrade()
    }
  })
}

function getGrade() {
  const postData = {
    page: 1,
    pageSize: 100000,
    class_list: [class_id.value],
    course_id: course_id.value
  }
  getTerminalCount(postData).then((res: any) => {
    console.log(res)
    scoreList.length = 0
    scoreList.push(...res.items)
  })
}

;(function getClass() {
  getClassList().then((res: any) => {
    classOption.length = 0
    classOption.push(...res)
  })
})()
;(function getCourse() {
  const postData = {
    teacher_id: JSON.parse(localStorage.getItem('userinfo')!).account
  }
  getCourseListTeach(postData).then((res: any) => {
    courseOption.length = 0
    courseOption.push(...res)
  })
})()
function getList() {
  loading.value = true
  const postData = {
    page: currentPage.value,
    pageSize: pageSize.value,
    class_id: class_id.value,
    course_id: course_id.value
  }
  getTerminalList(postData).then((res: any) => {
    dataSource.length = 0
    columns.length = 0
    dataSource.push(...res.data)
    columns.push(...res.columns)
    loading.value = false
  })
}
</script>
