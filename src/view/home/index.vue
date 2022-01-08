<template>
  <header>
    <section>
      <Avatar>{{useStore.username}}</Avatar>
    </section>
  </header>
  <main>
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts">
import { Avatar } from 'ant-design-vue'
import { userInfo } from '@/api/user'
import { useUserStore } from '@/store'

const useStore = useUserStore()
userInfo().then((res: any) => {
  useStore.setUserInfo(res.username)
})
</script>

<style lang="scss" scoped>
header {
  height: 60px;
  border-bottom: 1px rgba($color: #999, $alpha: 0.2) solid;
  box-shadow: 0 7px 10px -10px rgba($color: #999, $alpha: 0.2);
  transition: .5s;
  &:hover {
    box-shadow: 0 7px 10px -10px rgba($color: #666, $alpha: .4);
  }
  section {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px 0;
  }
}
main {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 0;
}
</style>