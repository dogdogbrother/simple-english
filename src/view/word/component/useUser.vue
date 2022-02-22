<template>
  <div class="use-user" flex-s m-b-20>
    <h4>正在学习的朋友们:</h4>
    <div>
      <Avatar
        v-for="user in users" 
        :key="user.id"
        :src="user.avatar"/>
    </div>
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

getWordUseUser(noteId as string).then((res: any) => {
  users.value = res
})
</script>

<style lang="scss" scoped>
h4 {
  margin: 0 20px 0 0;
}
</style>