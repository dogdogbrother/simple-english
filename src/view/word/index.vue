<template>
  <UseUser />
  <div class="oprate-btns">
    <Button type="primary">时间排序</Button>
    <Button type="primary">陌生度排序</Button>
    <Button type="primary">隐藏已掌握</Button>
    <Button 
      v-if="useStore.userInfo.useNote != noteId" 
      type="primary" 
      @click="selecNote"
      :loading="useLoading"
    >{{useLoading ? "正在切换中" : "切换到此单词本"}}</Button>
  </div>
  <ul class="word-box">
    <li v-for="word in wordList" :key="word.id">
      <span class="word">{{word.keyWord}}</span>
      <span>{{word.youdao.translation}}</span>
      <span>{{planMap[word.plan as string] || "未学习"}}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { getNoteWord } from '@/api/word'
import { useNote } from '@/api/note'
import { useRoute } from 'vue-router'
import { Button } from 'ant-design-vue'
import { ref } from 'vue'
import { useUserStore } from '@/store'
import { wordType } from '@/type/word'
import UseUser from './component/useUser.vue'

const { noteId } = useRoute().params
const wordList = ref<wordType[]>([])
const useStore = useUserStore()
const useLoading = ref(false)

const planMap: {[key: string]: string } = {
  "0": "陌生", 
  "1": "见过", 
  "2": "眼熟", 
  "3": "了解", 
  "4": "了解", 
  "5": "熟悉", 
  "6": "掌握", 
}

getNoteWord(noteId as string).then((res: any) => {
  wordList.value = res
})

// 切换单词本
function selecNote() {
  useLoading.value = true
  useNote(noteId).then(() => {
    // userInfo 下 的 useNote 字段更新了
    useStore.setUserInfo()
  }).finally(() => useLoading.value = false)
  
}
</script>

<style lang="scss" scoped>
.oprate-btns {
  margin-right: -20px;
  > * {
    margin-right: 20px;
    margin-bottom: 20px;
  }
}
.word-box {
  width: 100%;
  max-width: 700px;
  li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    font-size: 16px;
    line-height: 34px;
    .word {
      font-weight: bold;
    }
  }
  span {
    flex: 1;
  }
}
</style>