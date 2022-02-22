<template>
  <div class="wrap">
    <div v-if="getWord">
      <div class="word-card" >
        <h2>{{getWord.keyWord}}</h2>
        <div flex-c m-b-10>
          <Phonetic class="phonetic" v-if="getWord.youdao.isWord" :phonetic="getWord.youdao" />
        </div>
        <div class="btn-wrap" m-b-10>
          <Button danger type="primary" @click="plan(getWord, 0)">陌生</Button>
          <Button type="primary" @click="plan(getWord, 1)">已掌握</Button>
          <Button type="primary" @click="plan(getWord, 2)">模糊</Button>
          <Button type="primary" @click="plan(getWord, 3)">认识</Button>
        </div>
        <div class="explain" m-b-20>
          <a href="javascript:;" @click="showExplain = !showExplain">
            {{showExplain ? "隐藏" : "查看"}}翻译
          </a>
          <div v-if="showExplain">
            <p blod m-t-10 m-b-10 size-20>{{getWord.youdao.translation}}</p>
            <ul>
              <li m-b-5 v-for="explains in getWord.youdao.explains">{{explains}}</li>
            </ul>
          </div>
        </div>
        <div class="word-mark" v-if="getWord.wordMark || getWord.fileList">
          <a href="javascript:;" @click="showWordMark = !showWordMark" >
            {{showWordMark ? "隐藏" : "查看"}}笔记
          </a>
          <div v-if="showWordMark" m-t-10>
            <div class="mark" v-html="getWord.wordMark" m-b-10></div>
            <ul class="fileList" v-if="getWord.fileList">
              <li v-for="file in getWord.fileList.split(',')">
                <img :src="file" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="plan-set">
        <li>全部单词: {{planSet.all}}</li>
        <li>已掌握: {{planSet.grasp}}</li>
        <li>学习中: {{planSet.studying}}</li>
        <li>未学习: {{planSet.notLearn}}</li>
      </div>
    </div>
    <div v-else-if="!userStore.userInfo.useNote">
      <span style="font-size: 16px;">还没有在学习中的单词本哦,去选一个吧</span>
      <Button type="primary" m-l-20 @click="toHome">去首页转转</Button>
    </div>
    <div v-else>
      <span>恭喜完成</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getNoteWord, setWordPlan, wordPlanActionType } from '@/api/word'
import { useUserStore } from '@/store'
import { watch, ref, computed, reactive } from 'vue'
import { wordType } from '@/type/word'
import { Button } from 'ant-design-vue';
import Phonetic from '@/widget/phonetic.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
// 是全部单词, 先背这个数组里面的
const wordList = ref<wordType[]>([])
// 不熟悉的单词 wordList背光了 到这里来
const unfamiliarWord = ref<wordType[]>([])
// 背过的单词.也就是点了认识的,因为后续要增加拼写的功能
const finish = ref<wordType[]>([])
// 学习进度
const planSet = ref({
  all: 0,  // 全部的单词
  grasp: 0, // 掌握的单词,也就是plan=6
  studying: 0, // 学习中的,plan有值但<6
  notLearn: 0, // plan是null就是这个单词没学习过
})

const showExplain = ref(false)
const showWordMark = ref(false)

// 获取单词内容
const getWord = computed(() => {
  return wordList.value[0] || unfamiliarWord.value[0] || 0
})

if (userStore.userInfo.useNote) {
  getNoteWordFn()
}
watch(() => userStore.userInfo.useNote, () => {
  getNoteWordFn()
})

function getNoteWordFn() {
  getNoteWord(userStore.userInfo.useNote).then((res: any) => {
    setPlanSet(res as wordType[])
    const filterRes = res.filter((word: wordType) => word.plan !=='6')
    filterRes.sort(() => {
      return 0.5 - Math.random()
    })
    wordList.value = filterRes
  })
}

function plan(word: wordType, action: wordPlanActionType) {
  const { keyWord } = word
  setWordPlan({
    keyWord,
    action
  })
  switch(action) {
    case 0:
      unfamiliarWord.value.push(wordList.value.shift() as wordType || unfamiliarWord.value.shift() as wordType)
      break;
    case 1:
      finish.value.push(wordList.value.shift() as wordType|| unfamiliarWord.value.shift() as wordType)
      break;
    case 2:
      unfamiliarWord.value.push(wordList.value.shift() as wordType|| unfamiliarWord.value.shift() as wordType)
      break;
    case 3:
      finish.value.push(wordList.value.shift() as wordType || unfamiliarWord.value.shift() as wordType)
      break;
  } 
}

function toHome() {
  router.push('/')
}

function setPlanSet(data: wordType[]) {
  const all = data.length
  let grasp = 0
  let studying = 0
  let notLearn = 0
  data.forEach(word => {
    if (word.plan === "6") {
      grasp++
    } else if (word.plan) {
      studying++
    } else notLearn++
  })
  console.log(all);
  
  planSet.value = {
    all,
    grasp,
    studying,
    notLearn
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  max-width: 660px;
  margin: 0 auto;
}
.word-card {
  background-color: #fff;
  border-radius: 10px;
  padding: 10px 20px;
  h2 {
    font-size: 32px;
    line-height: 1.6;
    text-align: center;
    margin: 0;
  }
}
.btn-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  > * {
    margin: 0 5px;
  }
}
.mark {
  white-space: pre-wrap;
}
.fileList {
  margin-bottom: -10px;
  img {
    max-width: 100%;
    margin-bottom: 10px;
  }
}
.plan-set {
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
  color: #666;
  li {
    margin-left: 10px;
  }
}
</style>