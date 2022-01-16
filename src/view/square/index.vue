<template>
  <ul>
    <li v-for="square in squareList" :key="square.id">
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
import { getSquareList } from '@/api/square'
import { ref } from 'vue'

const squareList = ref<any>([])

getSquareList().then((res: any) => {
  squareList.value = res
  console.log(res)
})

</script>

<style lang="scss" scoped>
li {
  margin-bottom: 20px;
}
</style>