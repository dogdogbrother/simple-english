<template>
  <div class="footer">
    <ul>
      <li @click="emptyFn">About</li>
      <li @click="emptyFn">Contact us</li>
      <li @click="emptyFn">Join us</li>
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

function emptyFn() {
  alert("没开发,没东西")
}
</script>

<style lang="scss" scoped>
@media screen and (min-width:1000px) {
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
}

@media screen and (max-width:1000px) {
  .footer {
    font-size: 14px;
    ul {
      display: flex;
      line-height: 20px;
      color: #fff;
      margin-bottom: 5px;
      li {
        margin-right: 15px;
        cursor: pointer;
      }
      li:hover{
        text-decoration: underline;
      }
    }
    .icons {
      color: #EB642C;
      > * {
        margin-right: 15px;
        cursor: pointer;
      }
    }
  }
}

</style>