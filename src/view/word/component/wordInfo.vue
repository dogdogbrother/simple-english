<template>
  <div class="wrap">
    <div class="word-info" v-if="wordInfo">
      <h2>{{wordInfo.keyWord}}</h2>
      <Phonetic class="phonetic" v-if="wordInfo.youdao.isWord" :phonetic="wordInfo.youdao" />
      <p blod m-t-20 m-b-10 size-18>{{wordInfo.youdao.translation}}</p>
      <ul>
        <li m-b-10 v-for="explain in wordInfo.youdao.explains">{{explain}}</li>
      </ul>
      <div class="mark" v-html="wordInfo.wordMark" m-b-10></div>
      <ul class="fileList" v-if="wordInfo.fileList">
        <li v-for="file in wordInfo.fileList.split(',')">
          <img :src="file" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { wordType } from '@/type/word';
import { ref } from 'vue'
import Phonetic from '@/widget/phonetic.vue'

const wordInfo = ref<wordType>()

function setWordInfo(info: wordType) {
  console.log(info);
  wordInfo.value = info
}
defineExpose({
  setWordInfo
})
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
.word-info {
  width: 88%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    font-size: 24px;
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