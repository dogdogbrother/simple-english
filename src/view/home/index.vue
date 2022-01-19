<template>
  <header>
    <section>
      <div pointer @click="toPage('/')">
        网站logo
      </div>
      <div class="header-main" flex-b>
        <nav flex-b>
          <span @click="toPage('/square')">动态广场</span>
        </nav>
        <Dropdown>
          <Avatar pointer :src="getUserAvatar(useStore.userInfo.avatar)">{{useStore.userInfo.username}}</Avatar>
          <template #overlay>
            <Menu slot="overlay">
              <Menu.Item>
                <span @click="toUser">我的主页</span>
              </Menu.Item>
              <Menu.Item disabled>
                <span>我的单词本</span>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item>
                <span @click="logout">退出登录</span>
              </Menu.Item>
            </Menu>
          </template>
        </Dropdown>
      </div>
    </section>
  </header>
  <main>
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts">
import { Avatar, Dropdown, Menu } from 'ant-design-vue'
import { useUserStore } from '@/store'
import { useRouter } from 'vue-router'
import { getUserAvatar } from '@/utils'

const router = useRouter()
const useStore = useUserStore()

useStore.setUserInfo()

function logout() {
  localStorage.removeItem('token')
  router.push('/login')
}

function toPage(path: string) {
  router.push(path)
}

function toUser() {
  router.push(`/user/${useStore.userInfo.id}`)
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
    align-items: center;
    .header-main {
      padding-left: 40px;
      flex: 1;
    }
    nav {
      span {
        cursor: pointer;
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