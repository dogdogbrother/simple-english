<template>
  <ul>
    <li v-for="square in props.dynamicList" :key="square.id">
      <div class="card-top">
        <UserShow :user="square.user" m-b-20/>
        <span class="time">{{calculateCreateTime(square.createdAt)}}</span>
      </div>
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
import { calculateCreateTime } from '@/utils/index'

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
.card-top {
  display: flex;
  justify-content: space-between;
  .time {
    color: #666;
    font-size: 12px;
  }
}
</style>