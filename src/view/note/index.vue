<template>
  <template v-if="!loading">
    <Handle v-if="noteList.length"/>
    <div v-if="useNote">
      <h3>学习中</h3>
      <NoteList :noteList="useNote? [useNote] : []" />
    </div>
    <div class="empty" v-if="!useNote && noteList.length">
      <p>暂时没有学习中的单词本哦,从下面的单词本选中一个吧</p>
    </div>
    <div class="empty" v-if="noteList.length === 0">
      <p>
        现在还没有单词本,去创建一个吧~ 
        <Button type="primary" m-l-10 @click="toCreate">新建单词本</Button>
      </p>
    </div>
    <div v-if="noteList.length">
      <h3>单词本</h3>
      <NoteList :noteList="noteList" />
    </div>
  </template>
  <span v-else>加载数据中...</span>
</template>

<script setup lang="ts">
import Handle from './component/handle.vue'
import { getNoteList, getUseNote } from '@/api/note'
import NoteList from '@/components/noteList/index.vue'
import { ref } from 'vue'
import { noteType } from '@/type/note'
import { Button } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const noteList = ref<noteType[]>([])
const useNote = ref<noteType | null>(null)
const loading = ref(false)

loading.value = true
Promise.all([getNoteListFn(), getUseNoteFn()]).then(res => {
  const [noteListRes, useNoteRes] = res
  noteList.value = noteListRes as noteType[]
  useNote.value = useNoteRes as noteType | null
  loading.value = false
})

function getNoteListFn() {
  return new Promise((resolve: any) => {
    getNoteList().then((res: any) => {
      resolve(res)
    })
  })
}
function getUseNoteFn() {
  return new Promise((resolve: any) => {
    getUseNote().then((res: any) => {
      resolve(res)
    })
  })
}

function toCreate() {
  router.push("/create-note")
}

</script>

<style lang="scss" scoped>
h3 {
  font-size: 18px;
}
.empty {
  padding: 20px 0;
  color: #333;
  font-size: 16px;
}
</style>