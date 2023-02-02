<template>
  <div class="p-4">
    <header class="flex items-center justify-between">
      <div class="flex items-center w-1/3">
        <div class="flex items-center mr-4">
          <span class="w-1/3">关键词：</span>
          <el-input v-model="keyWord" class="w-2/3" />
        </div>
        <el-button type="primary" @click="getList">搜索</el-button>
        <el-button v-if="identity !== 'student'" type="primary" @click="router.push(`/home/datamanage/createvideo`)">上传视频</el-button>
      </div>
      <div class="flex items-center">
        <div class="flex items-center mr-4">
          <el-icon class="cursor-pointer"><ArrowLeft /></el-icon>
          <span class="mr-4 ml-4">第 {{ currentPage }} 页</span>
          <el-icon class="cursor-pointer"><ArrowRight /></el-icon>
        </div>
        <div>共 {{ total }} 条数据</div>
      </div>
    </header>
    <main class="mt-4 flex flex-wrap">
      <div
        v-for="(item, index) in dataSource"
        :key="item.id"
        class="card bg-white p-4 w-21/110 mb-4 cursor-pointer"
        :class="(index + 1) / 5 === 1 || (index + 1) / 5 === 2 ? 'mr-0' : 'mr-4'"
        @click="router.push(`/home/datamanage/videoinfo?id=${item.id}`)"
      >
        <div class="cover">
          <img :src="item.cover" alt="" />
          <div class="model flex justify-center items-center">
            <el-icon size="36" color="#ededed"><VideoPlay /></el-icon>
          </div>
        </div>
        <div class="name mt-2 ellipsis1">{{ item.name }}</div>
        <div class="desc flex justify-between mt-2">
          <div class="author">{{ item.username }}</div>
          <div class="date">{{ item.date }}</div>
        </div>
        <div class="flex justify-between">
          <span></span>
          <span style="font-size: 0.2vw" class="text-blue-400" @click.stop="router.push(`/home/datamanage/createvideo?id=${item.id}`)">修改</span>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { VideoList } from './videoList'
import { getVideoList } from './videoList.api'

const router = useRouter()
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const dataSource: VideoList[] = reactive([])
const keyWord = ref('')
const identity = JSON.parse(localStorage.getItem('userinfo')!).identity

getList()

function getList() {
  loading.value = true
  const postData = {
    page: currentPage.value,
    pageSize: pageSize.value,
    keyWord: keyWord.value
  }
  getVideoList(postData).then((res: any) => {
    total.value = res.total
    dataSource.length = 0
    dataSource.push(...res.items)
    loading.value = false
  })
}
</script>
<style lang="scss" scoped>
.card {
  transition: all 0.6s;
  &:hover {
    box-shadow: 1px 1px 6px 1px rgba($color: #000000, $alpha: 0.2);
  }
}
.cover {
  width: 100%;
  height: 160px;
  position: relative;
  &:hover {
    .model {
      display: flex;
    }
  }
  img {
    width: 100%;
    height: 100%;
  }
  .model {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
  }
}
.author, .date {
  color: #666;
  font-size: 0.2vw;
}
</style>
