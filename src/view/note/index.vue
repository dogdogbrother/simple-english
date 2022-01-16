<template>
  <Handle />
  <NoteList :noteList="noteList" />
</template>

<script setup lang="ts">
import Handle from './component/handle.vue'
import { getNoteList } from '@/api/note'
import NoteList from './component/noteList.vue'
import { ref } from 'vue'

const noteList = ref([])

getData()

function getData() {
  getNoteList().then((res: any) => {
    noteList.value = res
  })
}
</script>

<style lang="scss" scoped>

</style>