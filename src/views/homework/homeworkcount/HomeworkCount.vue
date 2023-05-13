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
      @current-change="getCount"
      @size-change="getCount"
      @reload="getCount"
    >
      <template #tableTitle>
        <div class="w-1/1 flex items-center">
          <div class="flex items-center">
            <span>科目：</span>
            <div>
              <el-select v-model="course_id" placeholder="请选择" @change="getCount">
                <el-option v-for="item in courseOption" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
          </div>
          <div class="flex items-center ml-4">
            <span>班级：</span>
            <div>
              <el-select v-model="class_id" placeholder="请选择" @change="getCount">
                <el-option v-for="item in classOption" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="flex items-center ml-4">
            <el-button type="primary" @click="toExport">导出</el-button>
          </div>
          <div class="flex items-center ml-4">
            <el-button type="primary" @click="toShow">数据可视化</el-button>
          </div>
        </div>
      </template>
      <el-table-column
        v-for="(item, index) in columns"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :align="item.align"
      ></el-table-column>
    </BasicTable>
    <el-dialog v-model="echartsVisible" title="数据可视化" center fullscreen>
      <div ref="echart_dom" class="echart_dom"></div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { getHomeworkCountTotal, getChartsCount } from './homeworkCount.api'
import { getCourseListTeach } from '../../message/signincount/signinCount.api'
import { ref, reactive, nextTick, computed } from 'vue'
import BasicTable from '/@/components/Table/BasicTable.vue'
import { columns } from './homeworkCount.data'
import { getClassList } from '/@/api/common'
import exportExcel from '/@/utils/exportExcel'
import { ElMessage } from 'element-plus'
import * as echarts from 'echarts'

const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const pageSizeOption = reactive([10, 30, 50, 100])
const total = ref(0)
const dataSource: DoneInfo[] = reactive([])
const courseOption: CourseOption[] = reactive([])
const course_id = ref<string>('')
const class_id = ref<string>('')
const classOption: CourseOption[] = reactive([])
const xData = ref<string[]>([])
const yData = ref<string[]>([])
const yMax = ref(0)
const echartsVisible = ref(false)
const echart_dom = ref<HTMLDivElement | null>(null)
const title = computed(() => {
  const class_name = classOption.filter(item => item.value === class_id.value)[0]?.label
  const course_name = courseOption.filter(item => item.value === course_id.value)[0]?.label
  return class_name + '——' + course_name + '作业数据可视化'
})

getClass()
getCourse()
getCount()

const toExport = () => {
  if (!dataSource.length) {
    ElMessage.error('请先筛选数据！')
    return
  }
  const headers = ['作业名称', '班级', '姓名', '科目', '评分']
  exportExcel(dataSource, headers, '作业统计表')
}

async function toShow() {
  const postData = {
    course_id: course_id.value,
    class_id: class_id.value
  }
  const res: any = await getChartsCount(postData)
  xData.value = res.xData
  yData.value = res.yData
  yMax.value = res.yMax
  echartsVisible.value = true

  nextTick(() => {
    const chartInstence = echarts.init(echart_dom.value as HTMLElement, undefined, { locale: "ZH" })
    chartInstence.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        },
        right: '8%',
        top: '-1%'
      },
      title: {
        text: title.value,
        left: 'center'
      },
      xAxis: {
        type: 'category',
        data: xData.value,
        name: '作业名称'
      },
      yAxis: [
        {
          type: 'value',
          max: yMax.value,
          name: '提交人数'
        },
        {
          type: 'value',
          max: 100,
          name: '提交率'
        }
      ],
      series: [
        {
          name: '提交人数',
          data: yData.value,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          },
          tooltip: {
            valueFormatter: function (value: string) {
              return value + ' 人'
            }
          }
        },
        {
          name: '提交率',
          data: yData.value.map(item => +(+item / yMax.value).toFixed(4) * 100),
          yAxisIndex: 1,
          type: 'line',
          showBackground: true,
          tooltip: {
            valueFormatter: function (value: number) {
              return value + '%'
            }
          }
        }
      ]
    })
  })
}

function getClass() {
  getClassList().then((res: any) => {
    classOption.length = 0
    classOption.push(...res)
  })
}

function getCourse() {
  const postData = {
    teacher_id: JSON.parse(localStorage.getItem('userinfo')!).account
  }
  getCourseListTeach(postData).then((res: any) => {
    courseOption.length = 0
    courseOption.push(...res)
  })
}

function getCount() {
  loading.value = true
  const postData = {
    course_id: course_id.value,
    class_id: class_id.value
  }
  getHomeworkCountTotal(postData).then((res: any) => {
    total.value = res.total
    dataSource.length = 0
    dataSource.push(...res)
    loading.value = false
  })
}
</script>
<style scoped>
.echart_dom {
  overflow: hidden auto;
  margin: 4vh auto 0;
  width: 90vw;
  height: 80vh;
}
</style>
