<template>
  <div class="user-show" flex-s>
    <Avatar 
      pointer 
      size="large" 
      :src="props.user.avatar" 
      m-r-20
      @click="toUser"
    />
    <div flex-1 class="user-info">
      <div flex-s m-b-10>
        <h3 pointer @click="toUser" m-r-20>{{props.user.nickname}}</h3>
        <span>( {{props.user.masterWord}} | {{props.user.allWord}} )</span>
      </div>
      <p class="introduce">{{props.user.introduce || "暂无简介"}}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Avatar } from 'ant-design-vue'
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
  line-height: 20px;
  h3 {
    font-size: 16px;
    display: inline-block;
    margin-bottom: 0;
  }
  span {
    font-size: 12px;
    color: #666;
  }
  .introduce {
    font-size: 12px;
    color: #aaa;
    margin-bottom: 0;
  }
}
</style>