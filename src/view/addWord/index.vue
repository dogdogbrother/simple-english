<template>
  <div class="wrap">
    <Form
      hideRequiredMark 
      :label-col="{span: 5}" 
      @finish="onAddWord"
      :model="form"
    >
      <Form.Item 
        label="单词"
        name="word"
        :has-feedback="checkWordStatus !== 0"
        @input="initCheckStatus"
        :validate-status="statusMap[checkWordStatus]"
        :help="checkWordStatus === 3 ? '单词已存在,请勿重复录入' : false"
        :rules="[{ required: true, message: '请输入单词' }]"
      >
        <Input v-model:value="form.word" @blur="checkWordAndGetInfo"/>
      </Form.Item>
      <Form.Item
        label="中译"
        name="chineseMeaning"
        :rules="[{ required: true, message: '请输入单词中译' }]"
      >
        <Textarea v-model:value="form.chineseMeaning"></Textarea>
      </Form.Item>
      <Form.Item :wrapper-col="{offset: 5}">
        <Button 
          :loading="loading"
          type="primary" 
          html-type="submit"
        >创建</Button>
      </Form.Item>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Form, Input, Button, Textarea, message } from 'ant-design-vue'
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { addWord, checkNoteWord, getYoudao } from '@/api/word'

const loading = ref(false)

const router = useRouter()

const checkWordStatus = ref<0 | 1 | 2 | 3>(0)  // 0 是未校验, 1 是loading, 2 是成功, 3 是失败

const { noteId } = useRoute().params

type StatusType = '' | 'validating' | 'success' | 'error'

const statusMap: {[key: number]: StatusType } = {
  0: '',
  1: 'validating',
  2: 'success',
  3: 'error'
}

const form = reactive({
  word: '',
  chineseMeaning: ''
})

function onAddWord() {
  addWord({
    ...form,
    noteId
  }).then(() => {
    router.back()
  }).catch(err => {
    message.error(err.msg)
  })
}

function initCheckStatus() {
  if (checkWordStatus.value !== 0) checkWordStatus.value = 0
}
// 检查此单词是否在此单词本中存在, 并且获取该单词的道翻译
function checkWordAndGetInfo() {
  if(!form.word) return
  checkWord()
  youdao()
}

function checkWord() {
  checkWordStatus.value = 1
  checkNoteWord(noteId as string, form.word).then(res => {
    checkWordStatus.value = 2
  }).catch(() => {
    checkWordStatus.value = 3
  })
}

function youdao() {
  getYoudao({
    word: form.word
  }).then(res => {
    console.log(res)
  })
}
</script>

<style lang="scss" scoped>
.wrap {
  width: 90%;
  max-width: 400px;
  margin: 0 auto;
  padding: 10px 0;
}
</style>