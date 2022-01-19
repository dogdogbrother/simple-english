<template>
  <div class="user-wrap">
    <UserInfo :userId="params.userId" :_userId="useStore.getUserInfo.id" />
  </div>
</template>

<script setup lang="ts">
import UserInfo from './component/UserInfo.vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/store'
interface params{
  userId?: string
}
const params: params = useRoute().params

const useStore = useUserStore()
console.log(useStore.getUserInfo.id);

</script>

<style lang="scss" scoped>
.user-wrap {
  width: 100%;
  max-width: 740px;
  margin: 0 auto;
}
</style>