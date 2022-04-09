<template>
  <div class="user-wrap">
    <UserInfo :userId="params.userId" :_userId="useStore.getUserInfo.id" />
    <Tabs>
      <Tabs.TabPane key="1" tab="动态">
        <DynamicList :dynamicList="squareList"/>
      </Tabs.TabPane>
      <Tabs.TabPane key="2" tab="单词本">
        <NoteList :noteList="noteList" v-if="noteList.length" />
        <span v-else>还没有创建过单词本</span>
      </Tabs.TabPane>
      <Tabs.TabPane key="3" tab="打卡日历">
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

interface params{
  userId?: string
}
const params: params = useRoute().params

const useStore = useUserStore()

const noteList: any = ref([])
const squareList: any = ref([])

getNoteList({ userId: params.userId }).then(res => {
  noteList.value = res
})

getSquareList({ userId: params.userId }).then(res => {
  squareList.value = res
})

</script>

<style lang="scss" scoped>
.user-wrap {
  width: 100%;
  max-width: 620px;
  margin: 0 auto;
}
</style>