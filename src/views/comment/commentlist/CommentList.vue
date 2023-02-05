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
        <template v-if="item.prop === 'url'" #default="{ row }">
          <el-image :src="row.url" class="user_img">
            <template #placeholder>
              <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt="" />
            </template>
            <template #error>
              <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt="" />
            </template>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="action" label="操作" align="center">
        <template #default="{ row }">
          <el-button link type="primary" @click="router.push(`/home/comment/commentinfo?id=${row.id}`)">修改</el-button>
          <el-popconfirm title="您确定删除?" @confirm="to_delete(row.id)">
            <template #reference>
              <el-button link type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </BasicTable>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { getCommentList, deleteComment } from './comment.api'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { columns } from './commentList.data'

interface CommentInfo {
  id: number
  info: string
  date: string
  name: string
  username: string
  account: string
  url: string
}

const router = useRouter()
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const pageSizeOption = reactive([10, 30, 50, 100])
const total = ref(0)
const dataSource: CommentInfo[] = reactive([])

getList()

function getList() {
  loading.value = true
  const postData = {
    page: currentPage.value,
    pageSize: pageSize.value
  }
  getCommentList(postData).then((res: any) => {
    total.value = res.total
    dataSource.length = 0
    dataSource.push(...res.items)
    loading.value = false
  })
}

function to_delete(id: number) {
  deleteComment({ id }).then(res => {
    if (res) {
      ElMessage.success('删除成功！')
      getList()
    }
  })
}
</script>
<style lang="scss" scoped>
:deep(.el-image) {
  width: 3.2vw;
  height: 3.2vw;
}
</style>
