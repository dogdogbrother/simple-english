<template>
  <div class="wrap">
    <div class="word-card" v-if="getWord">
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
    <div v-else>恭喜完成</div>
  </div>
</template>

<script setup lang="ts">
import { getNoteWord, setWordPlan, wordPlanActionType } from '@/api/word'
import { useUserStore } from '@/store'
import { watch, ref, computed } from 'vue'
import { wordType } from '@/type/word'
import { Button } from 'ant-design-vue';
import Phonetic from '@/widget/phonetic.vue'
 

const userStore = useUserStore()
// 是全部单词, 先背这个数组里面的
const wordList = ref<wordType[]>([])

// 不熟悉的单词 wordList背光了 到这里来
const unfamiliarWord = ref<wordType[]>([])

// 背过的单词.也就是点了认识的,因为后续要增加拼写的功能
const finish = ref<wordType[]>([])

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
    res.sort(() => {
      return 0.5 - Math.random()
    })
    wordList.value = res
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
</style>