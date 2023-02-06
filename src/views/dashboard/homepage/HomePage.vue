<template>
  <div class="flex h-1/1">
    <div class="w-1/2 mr-4 bg-white p-4 scrollbar-hidden" style="overflow-y: auto">
      <div class="text-center font-700" style="font-size: 1.2vw">简介</div>
      <div style="font-size: 1vw; line-height: 1.8">
        实验管理信息系统是一个集教学、科研和生产为一体的管理系统，它能更好地满足各种实验需求。 1：实验管理的目的
        实验管理的目的是为了更好地实现实验室信息化、数字化。实验管理系统包括了实验项目信息、实验过程控制和实验报告单等内容，能够帮助学校对实验进行全过程监控和管理。实验管理系统还具有数据备份功能，可以保证数据库中的数据完整保存下来，并在出现故障时及时恢复系统。此外，实验室信息系统还应具备查询、报表打印等功能，方便管理人员随时查看相关情况。
        2：实验数据库的构成
        实验数据库是指对实验室进行各种管理活动所需要的数据信息。这些信息包括：仪器设备、试剂名称和数量、人员组成情况、实验项目记录等。根据使用目的，可以将其划分为两类：1.基础资料库;2.专业资料库。实验资料库主要提供给科研机构或企业内部员工用来查找相关仪器设备、试剂名称及用量、人员组成情况、实验项目记录等所需的详细信息。专业资料库则以用户所在行业或者公司产品类型来组织资料内容，如生产车间、研发部门、销售部门等等。
        3: 实验流程图 实验流程图是根据实验目的、实验内容和需要达到的目标来制定的。具体包括：(1) 实验背景资料收集；(2)
        实验方案制订；(3) 实验实施过程监督和评估；(4)
        实验结果分析与总结等步骤。流程示意图如下：首先，在实验背景资料收集阶段，从学校网站或其他渠道获取关于实验室研究项目或课题组简介及人员信息。其次，在实验方案制订阶段，主要通过网上问卷或者邮件调查方式了解学生对实验方案的意见和建议。接下来，在实验实施过程中，需要进行日常管理和监督，以保证实验顺利开展并取得预期效果。最后，在实验结果分析与总结阶段，对实验数据进行统计处理和图表展示，为之后的工作提供参考依据。
        4: 各个步骤说明 实验管理系统的主要目的是通过对实验数据的管理来提高实验质量和效率。下面就介绍各个步骤说明：1.
        首先，要创建一个数据库用来存储实验数据。这一步需要确定所需的字段类型、字段数量以及每个记录的有效时间。2.
        然后将该表转换成适合于Word文档格式的文件。3. 接下来就是将这些数据添加到表格中了。4.
        最后修改并发布最新的查询结果到指定位置即可。
        本文将对实验管理系统的架构及功能进行介绍，帮助大家了解该系统。希望大家能够根据自己的实际情况选择合适的实验管理模式。
      </div>
    </div>
    <div class="w-1/2 bg-white h-1/2 p-4">
      <div class="text-center font-700" style="font-size: 1.2vw">公告</div>
      <div v-if="!noticeList.length" class="flex justify-center w-full">
        <el-empty description="暂时没有公告" />
      </div>
      <div
        v-for="(item, index) in noticeList"
        :key="index"
        class="flex justify-between cursor-pointer"
        @click="router.push(`/home/message/noticeinfo?id=${item.id}`)"
      >
        <div class="flex">
          <div class="mr-2">{{ index + 1 }}.</div>
          <div class="ellipsis1">{{ item.title }}</div>
        </div>
        <div class="ellipsis1 text-gray-500">{{ item.date }}</div>
      </div>
      <div
        v-if="noticeList.length === 11"
        class="text-center text-blue-500 cursor-pointer"
        @click="router.push('/home/message/noticelist')"
      >
        更多
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, watchEffect, ref } from 'vue'
import { useRouter } from 'vue-router'
import { DataItem } from '../../message/noticelist/noticeList'
import { getNoticeList } from '../../message/noticelist/noticeList.api'
import { PostData } from '/@/types'

const router = useRouter()
const noticeList: DataItem[] = reactive([])

getList()

function getList() {
  const postData: PostData = {
    page: 1,
    pageSize: 11
  }
  getNoticeList(postData).then((res: any) => {
    noticeList.length = 0
    noticeList.push(...res.items)
  })
}
</script>
