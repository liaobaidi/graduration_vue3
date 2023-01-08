<template>
  <div class="header-container p-4 bg-white flex items-center justify-between" bg="blue-500">
    <div class="flex items-center">
      <div class="mr-4 flex items-center cursor-pointer" @click="navCollapse">
        <el-icon size="24" v-if="!isCollapse"><Fold /></el-icon>
        <el-icon size="24" v-else><Expand /></el-icon>
      </div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index" :to="{ path: breadPath[index].path }">{{
          item
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="flex items-center">
      <div class="user flex items-center mr-4">
        <el-avatar :src="userInfo.url">
          <template #default>
            <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt="" />
          </template>
        </el-avatar>
        <span class="mr-2 ml-2">{{ greet }}</span>
        <span>{{ userInfo.username || user }}</span>
      </div>
      <div class="cursor-pointer mr-2 flex items-center" @click="reload">
        <el-tooltip content="刷新页面" placement="bottom">
          <el-icon size="24"><RefreshLeft /></el-icon>
        </el-tooltip>
      </div>
      <div class="cursor-pointer mr-2 flex items-center" @click="fullScreen">
        <el-tooltip :content="isFullScreen ? '关闭全屏' : '打开全屏'" placement="bottom">
          <el-icon size="24"><FullScreen /></el-icon>
        </el-tooltip>
      </div>
      <div class="cursor-pointer mr-4 flex items-center" @click="toggle">
        <el-tooltip :content="language === 'zh-cn' ? '切为英文' : '切为中文'" placement="bottom">
          <el-icon size="24"><Switch /></el-icon>
        </el-tooltip>
      </div>
      <div class="cursor-pointer flex items-center">
        <el-dropdown @command="handle">
          <span class="el-dropdown-link">
            <el-icon size="24"><Setting /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="user_info">账户设置</el-dropdown-item>
              <el-dropdown-item command="update_psw">修改密码</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
  <el-dialog v-model="update_status" title="修改密码" width="20%" @closed="clearData">
    <div>
      <el-form :model="formData" ref="form" :rules="formRules" label-width="80px">
        <el-form-item label="密码" prop="psw" class="w-4/5">
          <el-input v-model="formData.psw" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPsw" class="w-4/5">
          <el-input v-model="formData.newPsw" />
        </el-form-item>
      </el-form>
      <div class="flex justify-center">
        <el-button type="primary" @click="update">修改</el-button>
      </div>
    </div>
  </el-dialog>
  <el-dialog v-model="userInfoStatus" title="用户详情" width="30%">
    <div>
      <el-form :model="userInfo">
        <el-form-item label="头像">
          <div @click="uploadFile">
            <el-image :src="userInfo.url" class="user_img">
              <template #placeholder>
                <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt="" />
              </template>
              <template #error>
                <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt="" />
              </template>
            </el-image>
          </div>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="userInfo.account" disabled />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="userInfo.username" disabled />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="userInfo.gender">
            <el-option value="0" label="女" />
            <el-option value="1" label="男" />
          </el-select>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker v-model="userInfo.brith" type="date" placeholder="Pick a day" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userInfo.email" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="userInfo.phone" />
        </el-form-item>
      </el-form>
      <div class="flex justify-center">
        <el-button type="primary" @click="save">修改</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { ref, defineEmits, onMounted, watchEffect, reactive, inject, Ref } from 'vue'
import { useRoute, RouteLocationMatched } from 'vue-router'
import { useStore } from 'vuex'
import { user_update, user_info, user_save, uploadFileImage } from '/@/api/user'
import { UserInfo } from '/@/types'

const route = useRoute()
const store = useStore()
const dayjs = inject('dayjs')
let isCollapse = ref(false)
const emit = defineEmits(['collapse', 'lang'])
let isFullScreen = ref(false)
let greet = ref('')
let user = JSON.parse(localStorage.getItem('userinfo')!).username
const breadcrumb: string[] = reactive([])
const breadPath: RouteLocationMatched[] = reactive([])
let update_status = ref(false)
const formData = reactive({
  psw: '',
  newPsw: ''
})
const formRules = {
  psw: [{ validator: checkPass, trigger: 'blur' }],
  newPsw: [{ validator: checkPass2, trigger: 'blur' }]
}
let form = ref()
const language = ref('zh-cn')
const userInfo: Partial<UserInfo> = reactive({})
const userInfoStatus = ref(false)
const uploadFiles: Ref<File | null> = ref()

const toggle = () => {
  language.value = language.value === 'zh-cn' ? 'en' : 'zh-cn'
  emit('lang', language.value)
}

getDetail()

function getDetail() {
  user_info({ account: JSON.parse(localStorage.getItem('userinfo')!).account }).then(res => {
    Object.assign(userInfo, res[0])
    userInfo.brith = dayjs(userInfo.brith).format('YYYY-MM-DD')
  })
}

function save() {
  console.log('save')
  userInfo.brith = dayjs(userInfo.brith).format('YYYY-MM-DD')

  user_save(userInfo).then(res => {
    if (res) {
      ElMessage.success('修改成功！')
      reload()
    }
  })
}

function uploadFile() {
  const input = document.createElement('input')
  input.type = 'file'
  input.click()
  input.onchange = () => {
    // 拿到文件对象 --- 用于上传
    uploadFiles.value = input.files![0]
    const form = new FormData()
    form.append('enctype', 'multipart/form-data')
    form.append('file', new Blob([uploadFiles.value]), uploadFiles.value.name)
    uploadFileImage(form).then(res => {
      userInfo.url = res.url
      ElMessage.success('上传成功！')
    })
  }
}

async function update() {
  const permission = await form.value.validate()
  if (!permission) return
  const postData = formData
  user_update(postData).then(res => {
    if (res) {
      update_status.value = false
      store.dispatch('logout')
    }
  })
}

function clearData() {
  form.value.resetFields()
}

function checkPass(rule: any, value: any, callback: any) {
  if (!formData.psw) {
    callback(new Error('密码不可为空！'))
  } else {
    callback()
  }
}

function checkPass2(rule: any, value: any, callback: any) {
  if (!formData.newPsw) {
    callback(new Error('密码不可为空！'))
  } else {
    callback()
  }
}

watchEffect(() => {
  breadcrumb.length = 0
  breadcrumb.push(...route.meta.name.split('/'))
  breadcrumb.shift()
  breadPath.length = 0
  breadPath.push(...route.matched)
})

onMounted(() => {
  let hours = +new Date().getHours()
  if (hours > 18) {
    greet.value = '晚上好 !'
  } else if (hours > 12) {
    greet.value = '下午好 !'
  } else if (hours > 11) {
    greet.value = '中午好 !'
  } else if (hours > 7) {
    greet.value = '上午好 !'
  } else {
    greet.value = '早上好 !'
  }
})

function handle(command: string) {
  switch (command) {
    case 'logout':
      store.dispatch('logout')
      break
    case 'update_psw':
      update_status.value = true
      break
    case 'user_info':
      userInfoStatus.value = true
      break
    default:
      break
  }
}

function navCollapse() {
  isCollapse.value = !isCollapse.value
  emit('collapse', isCollapse.value)
}

function fullScreen() {
  let el = document.documentElement
  if (!isFullScreen.value) {
    el.requestFullscreen()
    isFullScreen.value = true
  } else {
    document.exitFullscreen()
    isFullScreen.value = false
  }
}
function reload() {
  location.reload()
}
</script>
<style scoped lang="scss">
.header-container {
}
:deep(.el-image) {
  width: 4.8vw;
  height: 4.8vw;
  border-radius: 2.4vw;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  &::after {
    content: '点击上传';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1.3333vw;
    text-align: center;
    line-height: 1.3333vw;
    color: #ededed;
    background-color: rgba(0, 0, 0, 0.3);
    pointer-events: none;
  }
}
:deep(.el-breadcrumb) {
  font-size: 0.8333vw;
  cursor: pointer;
}
:deep(.el-form-item) {
  display: flex;
  align-items: center;
}
</style>
