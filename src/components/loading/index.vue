<template>
  <div class="loading">
    <Spin m-b-20 size="large" />
    <span>{{props.msg}}</span>
  </div>
</template>

<script setup lang="ts">
import { Spin } from 'ant-design-vue'
const props = defineProps<{
  msg: string,
  type?: 'inline' | 'block'
}>()
const displayType = props.type ===  'inline' ? 'inline-flex' : 'flex'

</script>
<style lang="scss" scoped>
.loading {
  display: v-bind(displayType);
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>

