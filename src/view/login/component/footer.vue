<template>
  <div class="footer">
    <ul>
      <li>About</li>
      <li>Contact us</li>
      <li>Join us</li>
    </ul>
    <div class="icons">
      <qq-outlined />
      <wechat-outlined />
      <github-outlined />
    </div>
  </div>
</template>

<script setup lang="ts">
import { QqOutlined, WechatOutlined, GithubOutlined } from '@ant-design/icons-vue'
</script>

<style lang="scss" scoped>
.footer {
  height: 30px;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  ul {
    display: flex;
    line-height: 30px;
    color: #fff;
    li {
      margin-right: 40px;
      cursor: pointer;
    }
    li:hover{
      text-decoration: underline;
    }
  }
  .icons {
    color: #EB642C;
    > * {
      margin-left: 20px;
      cursor: pointer;
    }
  }
}
</style>