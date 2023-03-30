<template>
  <div class="p-4 bg-white">
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
        <div class="w-1/1 flex justify-between">
          <div class="flex">
            <div class="flex items-center" v-if="idetity!=='student'">
              <span class="w-1/2">教师工号：</span>
              <el-input v-model="account" @keyup.enter="getList" />
            </div>
            <div class="flex items-center ml-4">
              <span class="w-1/2">上课日期：</span>
              <el-date-picker
                v-model="time"
                format="YYYY-MM-DD"
                type="date"
                placeholder="Pick a day"
                @change="getList"
              />
            </div>
            <div class="flex items-center ml-4">
              <span>选择班级：</span>
              <el-select v-model="class_id" placeholder="选择班级" @change="getList">
                <el-option label="2019级信息与科学1班" value="101" />
                <el-option label="2019级信息与科学2班" value="102" />
                <el-option label="2019级信息与科学3班" value="103" />
                <el-option label="2019级信息与科学4班" value="104" />
                <el-option label="全部" value="0" />
              </el-select>
            </div>
          </div>
          <el-button type="primary" :icon="Upload" @click="import_visible = true" v-if="idetity==='admin'">课表导入</el-button>
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
  <el-dialog v-model="import_visible" title="导入课表" center width="30%">
    <div class="text-blue-500 cursor-pointer" @click="toSelect">选择文件</div>
    <div>{{ import_file?.name }}</div>
    <div class="mt-4">
      <el-popconfirm title="导入课表将覆盖当前课表，你确定导入吗？" @confirm="toImport">
        <template #reference>
          <el-button type="primary">导入</el-button>
        </template>
      </el-popconfirm>
    </div>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive, Ref } from 'vue'
import { getCourseList, importCourse } from './courselist.api'
import { columns } from './courseList.data'
import { ElMessage, dayjs } from 'element-plus'
import { Upload } from '@element-plus/icons-vue'

const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const pageSizeOption = reactive([10, 30, 50, 100])
const total = ref(0)
const dataSource: Course[] = reactive([])
const account = ref('')
const time = ref('')
const class_id = ref('')
const import_visible = ref(false)
const import_file: Ref<File | undefined> = ref()
const idetity = JSON.parse(localStorage.getItem('userinfo')!).identity

getList()

const toSelect = () => {
  import_file.value = undefined
  const input = document.createElement('input')
  input.type = 'file'
  input.click()
  input.onchange = () => {
    // 拿到文件对象 --- 用于上传
    import_file.value = input.files![0]
    if (!/application\/vnd.ms-excel/gi.test(import_file.value.type)) {
      import_file.value = undefined
      ElMessage.error('请上传Excel文件')
      return
    }
  }
}

function getList() {
  loading.value = true
  const postData = {
    page: currentPage.value,
    pageSize: pageSize.value,
    account: account.value,
    time: time.value ? dayjs(time.value).format('YYYY-MM-DD') : '',
    class_id: class_id.value
  }
  getCourseList(postData)
    .then((res: any) => {
      total.value = res.total
      dataSource.length = 0
      dataSource.push(...res.items)
    })
    .finally(() => (loading.value = false))
}

function toImport() {
  const form = new FormData()
  form.append('enctype', 'multipart/form-data')
  form.append('file', new Blob([import_file.value!]), import_file.value!.name)
  importCourse(form).then((res: any) => {
    if (res) {
      ElMessage.success('success')
      import_visible.value = false
      getList()
    }
  })
}
</script>
