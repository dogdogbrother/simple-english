<template>
  <DynamicList :dynamicList="squareList" />
</template>

<script setup lang="ts">
import { getSquareList } from '@/api/square'
import { ref } from 'vue'
import DynamicList from '@/components/dynamicList/index.vue'
import { squareType } from '@/type/square'

const squareList = ref<squareType[]>([])

getSquareList().then((res: any) => {
  squareList.value = res
})

</script>

<style lang="scss" scoped>
</style>