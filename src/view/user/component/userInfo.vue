<template>
  <div class="user-card" flex-s>
    <Avatar size="large" :src="userInfo.avatar" m-r-20 />
    <div flex-1 class="user-info">
      <h3>{{userInfo.nickname}}</h3>
      <p class="introduce">{{userInfo.introduce || "暂无简介"}}</p>
    </div>
    <Button 
      v-if="props.userId == props._userId"
      class="edit-btn" 
      type="primary"
    >编辑资料</Button>
  </div>
  
</template>

<script setup lang="ts">
import { oneUserInfo } from '@/api/user'
import { ref } from 'vue'
import { Avatar, Button, Tabs } from 'ant-design-vue'

const props = defineProps({
  userId: String,
  _userId: String,  // 登录的这个人的userId
})

const userInfo: any = ref({})

oneUserInfo(props.userId as string).then(res => {
  userInfo.value = res
})


</script>

<style lang="scss" scoped>
.user-card {
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  position: relative;
  margin-bottom: 10px;
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
.edit-btn {
  position: absolute;
  bottom: 20px;
  right: 20px;
}
</style>