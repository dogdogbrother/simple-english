<template>
  <div class="wrap">
    <div class="view">
      <div></div>
    </div>
    <div class="login-box">
      
    </div>
  </div>
</template>
<script setup lang="ts">

const bgList = ["login-bg-1.jpg", "login-bg-2.jpg", "login-bg-3.jpg", "login-bg-4.jpg"]
const randomBg = bgList[Math.floor(Math.random() * bgList.length)]
const imgPath = `url(/img/${randomBg})`

</script>

<style lang="scss" scoped>
.wrap {
  width: 100vw;
  min-width: 1080px;
  height: 100vh;
  display: flex;
}
.view {
  background-image: v-bind(imgPath);
  background-size: cover;
  background-position: center center;
  width: 68%;
  height: 100%;
  div {
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: .2);
  }
}
.login-box {
  width: 32%;
}
</style>