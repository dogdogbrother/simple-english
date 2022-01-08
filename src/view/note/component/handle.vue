<template>
  <section>
    <Form layout="inline">
      <Form.Item>
        <Input 
          allowClear 
          placeholder="输入单词本或单词"
          @pressEnter="onSearch"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" @click="toCreate">新建单词本</Button>
      </Form.Item>
    </Form>
  </section>
</template>


<script setup lang="ts">
import { Input, Form, Button } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function onSearch() {
  alert(22)
}

function toCreate() {
  router.push("/create-note")
}
</script>

<style lang="scss" scoped>
section {
  
}
</style>