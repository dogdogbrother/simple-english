<template>
  <Handle />
  <div v-if="useNote">
    <h3>学习中</h3>
    <NoteList :noteList="useNote? [useNote] : []" />
  </div>
  <div>
    <h3>全部单词本</h3>
    <NoteList :noteList="noteList" />
  </div>
</template>

<script setup lang="ts">
import Handle from './component/handle.vue'
import { getNoteList, getUseNote } from '@/api/note'
import NoteList from '@/components/noteList/index.vue'
import { ref } from 'vue'
// import { noteType } from '@/type/note'

const noteList = ref([])
const useNote = ref<any>(null)

getData()

function getData() {
  getNoteList().then((res: any) => {
    noteList.value = res
  })
}
getUseNote().then((res: any) => {
  console.log(res);
  
  useNote.value = res
})
</script>

<style lang="scss" scoped>
h3 {
  font-size: 18px;
}
</style>