<template>
  <div class="bg-white p-3">
    <BasicTable
      v-loading="loading"
      :data="scoreList"
      background
      hide-on-single-page
      stripe
      layout="prev, pager, next, jumper, sizes, total"
      @current-change="getList"
      @size-change="getList"
      @reload="getList"
    >
      <template #tableTitle>
        <el-button type="primary" @click="toExport">导出</el-button>
        <el-button type="primary" class="ml-4" @click="toShow">可视化分析</el-button>
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
  <el-dialog v-model="echartsVisible" title="数据可视化" center fullscreen>
    <div ref="echart_dom" class="echart_dom"></div>
  </el-dialog>
</template>
<script lang="ts" setup>
import { getGradeList } from './gradeCountStu.api'
import { ref, reactive, nextTick, Ref } from 'vue'
import { columns } from './gradeCountStu.data'
import exportExcel from '/@/utils/exportExcel'
import * as echarts from 'echarts'

interface Score {
  account: string
  class_view: string
  course_name: string
  score: number
  username: string
}

const scoreList: Score[] = reactive([])
const loading = ref(false)
const echartsVisible = ref(false)
const echart_dom: Ref<HTMLElement | null> = ref(null)

getList()

const toShow = () => {
  echartsVisible.value = true

  const xData = scoreList.map(it => it.course_name)
  const data = scoreList.map(it => it.score)

  nextTick(() => {
    const chartInstence = echarts.init(echart_dom.value as HTMLElement, undefined, { locale: 'ZH' })
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
        text: JSON.parse(localStorage.getItem('userinfo')!).username + '成绩分析',
        left: 'center'
      },
      xAxis: {
        type: 'category',
        data: xData,
        name: '科目'
      },
      yAxis: [
        {
          type: 'value',
          max: 100,
          name: '分数'
        }
      ],
      series: [
        {
          name: '分数',
          data,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          },
          tooltip: {
            valueFormatter: function (value: string) {
              return value + ' 分'
            }
          }
        }
      ]
    })
  })
}

const toExport = () => {
  const headers = ['学号', '姓名', '班级', '科目', '分数']
  exportExcel(
    scoreList.map(item => {
      return {
        account: item.account,
        username: item.username,
        class_view: item.class_view,
        course_name: item.course_name,
        score: item.score
      }
    }),
    headers,
    '成绩单'
  )
}

function getList() {
  loading.value = true
  getGradeList().then((res: any) => {
    scoreList.length = 0
    scoreList.push(...res)
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
