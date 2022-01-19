<template>
  <ul>
    <li v-for="dynamic: any in props.dynamicList">
      <div class="user-header" flex-s>
        <Avatar :src="getUserAvatar(dynamic.user.avatar)"/>
        <div class="info">

        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { Avatar } from 'ant-design-vue'
import { getUserAvatar } from '@/utils'

const props = defineProps({
  dynamicList: Array
})
</script>

<style lang="scss" scoped>
li {
  margin-bottom: 10px;
  background-color: #fff;
}
.info {
  
}
</style>