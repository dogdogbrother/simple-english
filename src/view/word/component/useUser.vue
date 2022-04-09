<template>
  <div style="padding-bottom: 15px;">
    <span v-if="loading">我倒是看看有多少在学习~  - -!</span>
    <div flex-s v-else-if="users.length">
      <h4 style="margin: 0 10px 0 0;">正在学习的朋友们:</h4>
      <div>
        <Avatar
          pointer
          v-for="user in users" 
          :key="user.id"
          @click="toUser(user)"
          :src="user.avatar"/>
      </div>
    </div>
    <span v-else>挺可惜,还没人学...</span>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { getWordUseUser } from '@/api/word'
import { ref } from 'vue';
import { userInfoType } from '@/type/user'
import { Avatar } from 'ant-design-vue'

const { noteId } = useRoute().params
const users = ref<userInfoType[]>([])
const loading = ref(false)


function getWordUseUserFn() {
  loading.value = true
  getWordUseUser(noteId as string).then((res: any) => {
    users.value = res
  }).finally(() => loading.value = false)
}
getWordUseUserFn()

function toUser(user: userInfoType) {
  window.open(`/user/${user.id}`)
}
defineExpose({
  getWordUseUserFn
})
</script>

<style lang="scss" scoped>
</style>