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
      <template #tableTitle>
        <div class="flex items-center w-1/4 mr-2">
          <div class="w-1/2">工号/学号：</div>
          <el-input v-model="account" placeholder="请输入工号或学号" @keyup.enter="getList" />
        </div>
        <div class="flex items-center w-1/6 mr-2">
          <div class="w-1/2">身份：</div>
          <el-select v-model="identity" placeholder="请选择用户身份" @change="getList">
            <el-option value="admin" label="管理员" />
            <el-option value="teacher" label="教师" />
            <el-option value="student" label="学生" />
            <el-option value="" label="全部" />
          </el-select>
        </div>
        <div class="flex items-center w-1/6">
          <el-button type="primary" :icon="Plus" @click="dialogVisible = true">添加用户</el-button>
          <el-button type="primary" :icon="Download" @click="exportList">导出</el-button>
          <el-button type="primary" :icon="Upload" @click="importStatus = true">导入</el-button>
        </div>
      </template>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="{ row }">
          <el-popconfirm title="您确定删除此用户?" @confirm="toDelete(row.id)">
            <template #reference>
              <el-button link type="danger" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </BasicTable>
    <!-- <el-pagination :total="total"></el-pagination> -->
  </div>
  <el-dialog v-model="dialogVisible" title="添加用户" width="30%">
    <el-form
      ref="myForm"
      :rules="rules"
      label-position="right"
      label-width="100px"
      :model="formData"
      style="max-width: 460px"
    >
      <el-form-item label="学号/工号" prop="account">
        <el-input v-model="formData.account" />
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username" />
      </el-form-item>
      <el-form-item label="用户身份" prop="identity">
        <el-select v-model="formData.identity" placeholder="请选择用户身份">
          <el-option value="admin" label="管理员" />
          <el-option value="teacher" label="教师" />
          <el-option value="student" label="学生" />
        </el-select>
      </el-form-item>
      <el-form-item label="班级" v-show="formData.identity === 'student'">
        <el-select v-model="formData.class_id" placeholder="请选择班级代码">
          <el-option value="101" label="信计1班" />
          <el-option value="102" label="信计2班" />
          <el-option value="103" label="信计3班" />
          <el-option value="104" label="信计4班" />
        </el-select>
      </el-form-item>
      <div class="flex justify-center items-center">
        <el-button type="primary" @click="addUser">添加</el-button>
      </div>
    </el-form>
  </el-dialog>
  <el-dialog v-model="importStatus" title="导入文件" width="30%" @closed="clearFile">
    <div>
      <div class="text-blue-400 mb-4 cursor-pointer" @click="chooseFile">
        {{ import_text }}
      </div>
      <el-button type="primary" :disabled="!import_file" @click="toImport">导入</el-button>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import BasicTable from '/@/components/Table/BasicTable.vue'
import { columns } from './index.data'
import { getUserList, exportUserList, insertUser, importUser, deleteUser } from './index.api'
import { DataItem } from './index'
import { reactive, ref, Ref } from 'vue'
import { PostData } from '/@/types'
import { Download, Plus, Upload } from '@element-plus/icons-vue'
import exportExcel from '/@/utils/exportExcel'
import { ElMessage } from 'element-plus'

const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const pageSizeOption = reactive([10, 30, 50, 100])
const total = ref(0)
const dataSource: DataItem[] = reactive([])
const account = ref('')
const identity = ref('')
const dialogVisible = ref(false)
const formData: Partial<DataItem> = reactive({})
const myForm = ref()
const rules = reactive({
  account: [{ required: true, message: '不可为空！', triggle: 'blur' }],
  username: [{ required: true, message: '不可为空！', triggle: 'blur' }],
  identity: [{ required: true, message: '不可为空！', triggle: 'blur' }]
})
const import_file: Ref<File | null> = ref(null)
const import_text = ref('选择文件')
const importStatus = ref(false)

getList()

function getList() {
  loading.value = true
  const postData: PostData & Partial<DataItem> = {
    page: currentPage.value,
    pageSize: pageSize.value,
    account: account.value,
    identity: identity.value
  }
  getUserList(postData).then((res: any) => {
    total.value = res.total
    dataSource.length = 0
    dataSource.push(...res.items)
    loading.value = false
  })
}
function exportList() {
  const postData: Partial<PostData> & Partial<DataItem> = {
    pageSize: 5000,
    account: account.value,
    identity: identity.value
  }
  exportUserList(postData).then(res => {
    // console.table(res)
    exportExcel(res, ['id', 'username', 'account', 'class_id', 'identity'], '用户列表')
  })
}
async function addUser() {
  const result = await myForm.value.validate()
  if (!result) return
  if (formData.identity !== 'student') {
    formData.class_id = null
  } else {
    if (!formData.class_id) {
      ElMessage.warning('必须选择班级')
      return
    }
  }
  insertUser(formData).then(res => {
    if (res) {
      ElMessage.success('success')
      dialogVisible.value = false
      myForm.value.resetFields()
      getList()
    }
  })
}

function clearFile() {
  import_file.value = null
  import_text.value = '选择文件'
}

function chooseFile() {
  clearFile()
  const input = document.createElement('input')
  input.type = 'file'
  input.click()
  input.onchange = () => {
    import_file.value = input.files![0]
    import_text.value = import_file.value!.name
    const reg = /xls|xlsx|excel|csv/gi    
    if (!reg.test(import_text.value.split('.').at(-1)!)) {
      ElMessage.error('文件格式有误！请选择excel文件')
      import_file.value = null
      import_text.value = '请选择文件'
    }
  }
}

function toImport() {
  const form = new FormData()
  form.append('enctype', 'multipart/form-data')
  form.append('file', new Blob([import_file.value!]), import_file.value!.name)
  importUser(form).then(res => {
    if (res) {
      ElMessage.success('导入成功！')
      import_file.value = null
      importStatus.value = false
      clearFile()
      getList()
    }
  })
}

function toDelete(id: number) {
  const postData = {
    id
  }
  deleteUser(postData).then(res => {
    if (res) {
      ElMessage.success('删除成功！')
      getList()
    }
  })
}
</script>

<style scoped></style>
