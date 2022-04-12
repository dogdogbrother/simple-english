<template>
  <header>
    <section>
      <nav>
        <span 
          v-for="nav in navs" 
          :key="nav.path"
          :class="{active: navAction === nav.path}"
          @click="toPage(nav.path as NavActionType)"
        >
          {{nav.name}}
        </span>
      </nav>
      <Dropdown>
          <Avatar pointer :src="useStore.userInfo.avatar">{{useStore.userInfo.username}}</Avatar>
          <template #overlay>
            <Menu slot="overlay">
              <Menu.Item>
                <span @click="toUser">我的主页</span>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item>
                <span @click="logout">退出登录</span>
              </Menu.Item>
            </Menu>
          </template>
        </Dropdown>
    </section>
  </header>
  <main>
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts">
import { Avatar, Dropdown, Menu } from 'ant-design-vue'
import { useUserStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const useStore = useUserStore()
const route = useRoute()

const navs = [
  { path: '/note', name: '单词本' },
  { path: '/square', name: '动态广场' },
  { path: '/memory', name: '背单词' },
]
type NavActionType = '/note' | '/square' | '/memory'
console.log(route.path);

const navAction = ref<NavActionType>(route.path as NavActionType)

useStore.setUserInfo()

function logout() {
  localStorage.removeItem('token')
  router.push('/login')
}

function toPage(path: NavActionType) {
  navAction.value = path
  router.push(path)
}

function toUser() {
  window.open(`/user/${useStore.userInfo.id}`)
}

</script>

<style lang="scss" scoped>
header {
  height: 60px;
  background-color: #fff;
  border-bottom: 1px rgba($color: #999, $alpha: 0.2) solid;
  box-shadow: 0 7px 10px -10px rgba($color: #999, $alpha: 0.2);
  transition: .5s;
  &:hover {
    box-shadow: 0 7px 10px -10px rgba($color: #666, $alpha: .4);
  }
  section {
    width: 90%;
    max-width: 1260px;
    margin: 0 auto;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    nav {
      display: flex;
      align-items: center;
      span {
        margin-right: 30px;
        cursor: pointer; 
        position: relative;
      }
      .active:after {
        content: '';
        display: block;
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 100%;
        height: 2px;
        border-radius: 1px;
        background-color: #285CBE;
      }
    }
  }
}

main {
  width: 90%;
  max-width: 1260px;
  margin: 0 auto;
  padding: 20px 0;
}
</style>