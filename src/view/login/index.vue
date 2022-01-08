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
@media screen and (min-width:1000px) {
  .wrap {
    width: 100vw;
    height: 100vh;
    display: flex;
  }
  .view {
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
    padding: 30px 15% 20px 10%;
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
}
@media screen and (max-width:1000px) {
  .view {
    width: 100%;
    height: 400px;
  }
  .form {
    width: 70%;
    max-width: 300px;
    height: 45%;
    margin: 0 auto;
  }
  .masking {
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .login-box {
    padding: 40px 0;
  }
}
.view {
  background-image: v-bind(imgPath);
  background-size: cover;
  background-position: center center;
}
.masking {
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000, $alpha: .2);
}
</style>