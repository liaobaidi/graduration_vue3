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
      @current-change="getGrade"
      @size-change="getGrade"
      @reload="getGrade"
    >
      <template #tableTitle>
        <div class="w-1/1 flex items-center">
          <div class="flex items-center">
            <span>课程：</span>
            <div>
              <el-select v-model="course_id" placeholder="请选择" @change="getGrade">
                <el-option v-for="item in courseOption" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
          </div>
          <div class="flex items-center ml-4">
            <span>班级：</span>
            <div>
              <el-select v-model="class_list" multiple placeholder="请选择" filterable @change="getGrade">
                <el-option v-for="item in classOption" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <el-button type="primary" class="ml-4" @click="toExport">导出</el-button>
          <el-button type="primary" class="ml-4" @click="toShow">数据可视化分析</el-button>
        </div>
      </template>
      <el-table-column
        v-for="(item, index) in columns"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :align="item.align"
      >
      </el-table-column>
    </BasicTable>
  </div>
  <el-dialog v-model="echartsVisible" title="数据可视化" center fullscreen @close="resetChart">
    <div ref="echart_dom" class="echart_dom"></div>
  </el-dialog>
</template>
<script lang="ts" setup>
import BasicTable from '/@/components/Table/BasicTable.vue'
import { ref, reactive, nextTick } from 'vue'
import { getTerminalCount } from '../terminalcount/terminalCount.api'
import { getCourseListTeach } from '../signincount/signinCount.api'
import { getClassList } from '/@/api/common'
import { columns } from './gradeCount.data'
import { ElMessage } from 'element-plus'
import exportExcel from '/@/utils/exportExcel'
import * as echarts from 'echarts'

const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const pageSizeOption = reactive([10, 30, 50, 100])
const total = ref(0)
const dataSource: Score[] = reactive([])
const class_list = ref<string[]>([])
const course_id = ref('')
const classOption: CourseOption[] = reactive([])
const courseOption: CourseOption[] = reactive([])
const echartsVisible = ref(false)
const echart_dom = ref<HTMLDivElement | null>(null)
const chartData = ref<unknown[]>([])
const level = ['优秀', '良好', '及格', '不及格']

getGrade()

const resetChart = () => {
  console.log(1)

  chartData.value = []
}

const toShow = async () => {
  if (!course_id.value || !class_list.value.length) {
    ElMessage.error('请先筛选数据！')
    return
  }
  const postData = {
    page: 1,
    pageSize: 100000,
    class_list: class_list.value,
    course_id: course_id.value
  }
  const res: any = await getTerminalCount(postData)
  const Obj: { [key: string]: number } = {
    优秀: 0,
    良好: 0,
    及格: 0,
    不及格: 0
  }
  res.items.forEach((item: Score) => {
    if (+item.score > 85) {
      Obj['优秀']++
    } else if (+item.score > 75) {
      Obj['良好']++
    } else if (+item.score > 60) {
      Obj['及格']++
    } else {
      Obj['不及格']++
    }
  })

  Object.keys(Obj).forEach(key => {
    chartData.value.push({
      value: Obj[key],
      name: key
    })
  })

  echartsVisible.value = true

  nextTick(() => {
    const chartInstence = echarts.init(echart_dom.value as HTMLElement, undefined, { locale: 'ZH' })
    chartInstence.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} 人 ({d}%)'
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true }
        },
        right: '8%',
        top: '-1%'
      },
      label: {
        show: true
      },
      emphasis: {
        label: {
          show: true
        }
      },
      title: {
        text:
          dataSource[0].course_name +
          '-' +
          classOption
            .filter(item => class_list.value.includes(item.value))
            .map(it => it.label)
            .join(',') +
          '饼图',
        left: 'center'
      },
      series: [
        {
          name: 'Radius Mode',
          type: 'pie',
          radius: [20, 140],
          center: ['50%', '50%'],
          roseType: 'radius',
          itemStyle: {
            borderRadius: 5
          },
          label: {
            show: true
          },
          emphasis: {
            label: {
              show: true
            }
          },
          data: chartData.value
        }
      ]
    })
  })
}

const toExport = () => {
  if (!dataSource.length) {
    ElMessage.error('请先筛选数据！')
    return
  }
  const headers = ['学号', '姓名', '班级', '科目', '分数']
  const title =
    dataSource[0].course_name +
    '-' +
    classOption
      .filter(item => class_list.value.includes(item.value))
      .map(it => it.label)
      .join(',') +
    '成绩表'
  exportExcel(
    dataSource.map(item => {
      return {
        account: item.account,
        username: item.username,
        class_view: item.class_view,
        course_name: item.course_name,
        score: item.score
      }
    }),
    headers,
    title
  )
}

function getGrade() {
  const postData = {
    page: currentPage.value,
    pageSize: pageSize.value,
    class_list: class_list.value,
    course_id: course_id.value
  }
  getTerminalCount(postData).then((res: any) => {
    dataSource.length = 0
    dataSource.push(...res.items)
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
</script>
<style scoped>
.echart_dom {
  overflow: hidden auto;
  margin: 4vh auto 0;
  width: 90vw;
  height: 80vh;
}
</style>
