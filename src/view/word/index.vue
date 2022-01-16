<template>
  <div class="oprate-btns">
    <Button type="primary">时间排序</Button>
    <Button type="primary">陌生度排序</Button>
    <Button type="primary">隐藏已掌握</Button>
    <Button 
      type="primary"
      @click="hideAllWord"
    >{{hideMeaning ? '显示' : '隐藏'}}中译</Button>
  </div>
  <ul class="word-box">
    <li v-for="word in wordList" :key="word.id">
      <span class="word">{{word.word}}</span>
      <Button @click="showWord(word.id)" v-if="hideWords.includes(word.id as never)" type="text">展示中译</Button>
      <span v-else>{{word.chineseMeaning}}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { getNoteWord } from '@/api/word'
import { useRoute } from 'vue-router'
import { Button } from 'ant-design-vue'
import { ref } from 'vue'

const { noteId } = useRoute().params
const wordList: any = ref([])
const hideMeaning = ref(false)
const hideWords = ref([])

getNoteWord(noteId as string).then(res => {
  wordList.value = res
})

function hideAllWord() {
  if (hideMeaning.value) {
    hideWords.value = []
  } else {
    hideWords.value = wordList.value.map((word: any) => word.id)
  }
  hideMeaning.value = true
}

function showWord(wordId: any) {
  hideWords.value = hideWords.value.filter(word => word !== wordId)
  // 如果当前页面都没有隐藏的单词了,就改变总开关
  if(hideWords.value.length === 0) {
    hideMeaning.value = false
  }
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
}
</style>