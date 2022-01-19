<template>
  <div class="user-show" flex-s>
    <Avatar pointer size="large" :src="getUserAvatar(props.user.avatar)" m-b-20 />
    <div flex-1 class="user-info">
      <h3>{{props.user.nickname}}</h3>
      <p class="introduce">{{props.user.introduce || "暂无简介"}}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Avatar } from 'ant-design-vue'
import { getUserAvatar } from '@/utils'
const props: any = defineProps({
  user: Object,
})

</script>

<style lang="scss" scoped>
.user-show {
  background-color: #fff;
  padding: 20px;
}
.user-info {
  h3 {
    font-size: 16px;
  }
  .introduce {
    font-size: 12px;
    color: #aaa;
    margin-bottom: 0;
  }
}
</style>