<template>
  {{useStore.username}}
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/index'
const useStore = useUserStore()
</script>

<style lang="scss" scoped>

</style>