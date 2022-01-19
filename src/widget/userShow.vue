<template>
  <div class="user-show" flex-s>
    <Avatar 
      pointer 
      size="large" 
      :src="getUserAvatar(props.user.avatar)" 
      m-r-20
      @click="toUser"
    />
    <div flex-1 class="user-info">
      <h3 pointer @click="toUser">{{props.user.nickname}}</h3>
      <p class="introduce">{{props.user.introduce || "暂无简介"}}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Avatar } from 'ant-design-vue'
import { getUserAvatar } from '@/utils'
import { userInfoType } from '@/type/user'

const props = defineProps<{
  user: userInfoType
}>()

function toUser() {
  window.open(`/user/${props.user.id}`)
}
</script>

<style lang="scss" scoped>
.user-show {
  background-color: #fff;
}
.user-info {
  h3 {
    font-size: 16px;
    display: inline-block;
  }
  .introduce {
    font-size: 12px;
    color: #aaa;
    margin-bottom: 0;
  }
}
</style>