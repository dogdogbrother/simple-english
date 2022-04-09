<template>
  <div class="square-wrap">
    <div v-if="loading">广场信息加载中...</div>
    <DynamicList :dynamicList="squareList" v-else />
  </div>
</template>

<script setup lang="ts">
import { getSquareList } from '@/api/square'
import { ref } from 'vue'
import DynamicList from '@/components/dynamicList/index.vue'
import { squareType } from '@/type/square'

const squareList = ref<squareType[]>([])
const loading = ref(false)

loading.value = true
getSquareList().then((res: any) => {
  squareList.value = res
}).finally(() => loading.value = false)

</script>

<style lang="scss" scoped>
.square-wrap {
  width: 100%;
  max-width: 660px;
  margin: 0 auto;
}
</style>