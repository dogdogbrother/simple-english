<template>
  <div class="user-wrap">
    <UserInfo :userId="params.userId" :_userId="useStore.getUserInfo.id" />
    <Tabs v-model:activeKey="tabType" @change="changeTab">
      <Tabs.TabPane key="square" tab="动态">
        <Loading msg="动态加载中..." v-if="noteLoading"/>
        <DynamicList v-else :dynamicList="squareList"/>
      </Tabs.TabPane>
      <Tabs.TabPane key="note" tab="单词本">
        <Loading msg="单词本加载中..." v-if="noteLoading"/>
        <NoteList :noteList="noteList" v-else-if="noteList.length" />
        <span v-else>还没有单词本</span>
      </Tabs.TabPane>
      <Tabs.TabPane key="calendar" tab="打卡日历">
        <Calendar />
      </Tabs.TabPane>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import UserInfo from './component/userInfo.vue'
import Calendar from './component/calendar.vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/store'
import { Tabs } from 'ant-design-vue'
import { getNoteList } from '@/api/note'
import { getSquareList } from '@/api/square'
import { ref } from 'vue'
import DynamicList from '@/components/dynamicList/index.vue'
import NoteList from '@/components/noteList/index.vue'
import Loading from '@/components/loading/index.vue'

interface params{
  userId?: string
}

const params: params = useRoute().params
const useStore = useUserStore()
const noteLoading = ref(false)
const squareLoading = ref(false)
const noteList: any = ref([])
const squareList: any = ref([])
// square note calendar 三个值
const tabType = ref(localStorage.getItem('tabType') || 'square')

noteLoading.value = true
getNoteList({ userId: params.userId }).then(res => {
  noteList.value = res
}).finally(() => noteLoading.value = false)

squareLoading.value = true
getSquareList({ userId: params.userId }).then(res => {
  squareList.value = res
}).finally(() => squareLoading.value = false)

function changeTab() {
  localStorage.setItem('tabType', tabType.value)
}

</script>

<style lang="scss" scoped>
.user-wrap {
  width: 100%;
  max-width: 620px;
  margin: 0 auto;
}
</style>