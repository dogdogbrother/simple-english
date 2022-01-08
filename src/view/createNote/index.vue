<template>
  <div class="wrap">
    <Form
      hideRequiredMark 
      :label-col="{span: 5}" 
      @finish="onAddNote"
      :model="form"
    >
      <Form.Item 
        label="单词本名"
        name="noteName"
        :rules="[{ required: true, message: '请输入单词本名' }]"
      >
        <Input v-model:value="form.noteName"/>
      </Form.Item>
      <Form.Item
        label="描述"
        name="noteSummary"
        :rules="[{ required: true, message: '请输入单词本描述' }]"
      >
        <Textarea v-model:value="form.noteSummary"></Textarea>
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
import { addNote } from '@/api/note'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  noteName: "",
  noteSummary: ""
})

const loading = ref(false)

function onAddNote(values: any) {
  loading.value = true
  addNote(values).then(() => {
    message.success("创建单词本成功")
    setTimeout(() => {
      router.back()
    }, 500)
  }).finally(() => loading.value = false)
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