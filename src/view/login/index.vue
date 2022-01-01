<template>
  <div class="wrap">
    <div class="view">
      <div class="masking">
        <Aphorism />
        <Footer />
      </div>
    </div>
    <div class="login-box">
      <Form class="form"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import Aphorism from './component/aphorism.vue'
import Footer from './component/footer.vue'
import Form from './component/form.vue'

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
}
.login-box {
  width: 32%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
}
.masking {
  width: 100%;
  height: 100%;
  padding: 30px 15% 20px 10%;
  background-color: rgba($color: #000, $alpha: .2);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.form {
  width: 70%;
  max-width: 300px;
  height: 45%;
  margin: 0 auto;
}

</style>