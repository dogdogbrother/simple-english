<template>
  <ul>
    <li v-for="square in props.dynamicList" :key="square.id">
      <UserShow :user="square.user" m-b-20/>
      <div v-if="square.type === '1'">
        欢迎<span>{{square.user.nickname}}</span>同学加入run军
      </div>
      <div v-if="square.type === '2'">
        <span>{{square.user.nickname}}</span>
        刚创建了
        <span>{{square.note.noteName}}</span>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import UserShow from '@/widget/userShow.vue'
import { squareType } from '@/type/square'
const props = defineProps<{
  dynamicList: squareType[]
}>()
</script>

<style lang="scss" scoped>
li {
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
}
</style>