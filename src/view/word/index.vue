<template>
  <UseUser ref="useUserRef" />
  <div class="oprate-btns">
    <div>
      <Button type="primary" @click="changeGraspStatus">{{isShowGrasp ? '隐藏' : '显示'}}已掌握</Button>
    </div>
    <Popconfirm 
      v-if="useStore.userInfo.useNote "
      placement="bottom" 
      ok-text="确定" 
      cancel-text="不了" 
      title="你已经有了正在学习中的单词本了,确定要切换吗"
      @confirm="selecNote">
      <Button
        v-if="useStore.userInfo.useNote != noteId" 
        type="primary" 
        :loading="useLoading"
      >{{useLoading ? "正在切换中" : "切换到此单词本"}}</Button>
    </Popconfirm>
    <Button 
      v-else-if="useStore.userInfo.useNote != noteId" 
      type="primary" 
      @click="selecNote"
      :loading="useLoading"
    >{{useLoading ? "正在切换中" : "切换到此单词本"}}</Button>
    <div m-l-10  v-if="useStore.userInfo.useNote == noteId" >
      <span m-r-10>已掌握{{getGraspNum}}个单词</span>
      <span m-r-10>{{getNoGraspNum}}个单词学习中</span>
      <span>{{getNotStarted}}单词未学习</span>
    </div>
  </div>
  <ul class="word-box">
    <li v-for="word in conditionWordList" :key="word.id">
      <span class="word" @click="showWordInfo(word)">{{word.keyWord}}</span>
      <span>{{word.youdao.translation}}</span>
      <div class="narrow">{{planMap[word.plan as string] || "未学习"}}</div>
      <Popconfirm 
        placement="bottom" 
        ok-text="确定" 
        cancel-text="不了" 
        :title='`要把这个单词设置为${word.plan === "6" ? "陌生" : "掌握"}吗?`'
        @confirm="setPlan(word)">
        <Button type="link">设为{{word.plan === '6' ? '陌生' : '掌握'}}</Button>
      </Popconfirm>
      <Popconfirm 
        placement="bottom" 
        ok-text="确定" 
        cancel-text="不了" 
        :title='`要把这个单词设置为${word.plan === "6" ? "陌生" : "掌握"}吗?`'
        @confirm="setPlan(word)">
        <Button type="link">删除</Button>
      </Popconfirm>
      <Button type="link">编辑</Button>
    </li>
  </ul>
  <Drawer
    v-if="_isPc"
    :visible="drawerState"
    @close="drawerState = false"
    placement="left"
    width="500"
  >
    <WordInfo ref="wordInfo" />
  </Drawer>
  <Drawer
    v-else
    :visible="drawerState"
    @close="drawerState = false"
    placement="bottom"
    height="500"
  >
    <WordInfo ref="wordInfo" />
  </Drawer>
</template>

<script setup lang="ts">
import { getNoteWord, setWordPlan } from '@/api/word'
import { useNote } from '@/api/note'
import { useRoute } from 'vue-router'
import { Button, Popconfirm, Drawer, message } from 'ant-design-vue'
import { ref, computed, nextTick } from 'vue'
import { useUserStore } from '@/store'
import { wordType } from '@/type/word'
import UseUser from './component/useUser.vue'
import { getCurrentInstance } from '@vue/runtime-core'
import WordInfo from './component/wordInfo.vue'
import { isPc } from '@/utils'
const currentInstance: any = getCurrentInstance()
const { noteId } = useRoute().params
const wordList = ref<wordType[]>([])
const useStore = useUserStore()
const useLoading = ref(false)

const _isShowGrasp = localStorage.getItem("isShowGrasp")
const isShowGrasp = ref(!!_isShowGrasp)  // 是否显示已掌握
const drawerState = ref(false)  // 抽屉的开关
// pc端和移动端抽屉配置稍有不同
const _isPc = ref(isPc)

const planMap: {[key: string]: string } = {
  "0": "陌生", 
  "1": "见过", 
  "2": "眼熟", 
  "3": "了解", 
  "4": "了解", 
  "5": "熟悉", 
  "6": "掌握", 
}

function getNoteWordFn() {
  getNoteWord(noteId as string).then((res: any) => {
    wordList.value = res
  })
}
getNoteWordFn()

// 切换单词本
function selecNote() {
  useLoading.value = true
  useNote(noteId).then(() => {
    // userInfo 下 的 useNote 字段更新了
    useStore.setUserInfo()
    currentInstance.proxy.$refs.useUserRef.getWordUseUserFn()
  }).finally(() => useLoading.value = false)
}

// 切换是否显示已掌握
function changeGraspStatus() {
  const _isShowGrasp = !isShowGrasp.value
  localStorage.setItem('isShowGrasp', _isShowGrasp ? 'true' : '')
  isShowGrasp.value = _isShowGrasp
}

const conditionWordList = computed(() => {
  if (!isShowGrasp.value) {
    return wordList.value.filter(word => word.plan !== '6')
  }
  return wordList.value
})

// 获取没掌握的单词数量
const getNoGraspNum = computed(() => {
  return wordList.value.filter(({plan}) => plan && plan !== '6').length
})

// 获取还没开始学的单词
const getNotStarted = computed(() => {
  return wordList.value.filter(word => !word.plan).length
})

// 获取已掌握的单词数量
const getGraspNum = computed(() => {
  return wordList.value.filter(word => word.plan === '6').length
})

// 显示单词的具体内容
async function showWordInfo(word: wordType) {
  drawerState.value = true
  await nextTick()
  currentInstance.proxy.$refs.wordInfo.setWordInfo(word)
}

// 设置单词为陌生或者掌握
function setPlan(word: wordType) {
  setWordPlan({
    action: word.plan === '6' ? 0 : 1,
    keyWord: word.keyWord
  }).then(() => {
    getNoteWordFn()
    message.success("设置成功")
  })
}
</script>

<style lang="scss" scoped>
.oprate-btns {
  display: flex;
  align-items: center;
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
      color: #285cbe;
      cursor: pointer;
      text-decoration: underline;
      &:hover {
        color: #4b7dcc;
      }
    }
    .narrow {
      width: 52px;
    }
  }
  span {
    flex: 1;
  }
}
</style>