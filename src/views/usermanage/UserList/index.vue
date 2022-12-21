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
      />
    </BasicTable>
    <!-- <el-pagination :total="total"></el-pagination> -->
  </div>
</template>

<script setup lang="ts">
import BasicTable from '/@/components/Table/BasicTable.vue'
import { columns } from './index.data'
import { getUserList } from './index.api'
import { DataItem } from './index'
import { reactive, ref } from 'vue'
import { PostData } from '/@/types'

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
  getUserList(postData).then((res: any) => {
    total.value = res.total
    dataSource.length = 0
    dataSource.push(...res.items)
    loading.value = false
  })
}
</script>

<style scoped></style>
