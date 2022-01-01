<template>
  <div>
    <h3>{{actionType === 0 ? "登 录" : "注 册"}}</h3>
    <Form 
      :model="loginForm" 
      @finish="onFinish" 
      autocomplete="off"
      v-if="actionType === 0"
    >
      <Form.Item
        name="username"
        :rules="[{ required: true, message: '请输入用户名' }]"
      >
        <Input placeholder="账号" v-model:value="loginForm.username"/>
      </Form.Item>
      <Form.Item
        name="password"
        :rules="[{ required: true, message: '请输入密码' }]"
      >
        <Input placeholder="密码" v-model:value="loginForm.password"/>
      </Form.Item>
      <div class="register-btn">
        <Button type="link" size="small" @click="changeActionType(1)">注 册</Button>
      </div>
      <Button type="primary" block html-type="submit" :loading="loading">登 录</Button>
    </Form>
    <Form 
      :model="registerForm" 
      @finish="onFinish" 
      autocomplete="off"
      v-else
    >
      <Form.Item
        name="username"
        :rules="[{ required: true, message: '请输入用户名' }]"
      >
        <Input placeholder="账号" v-model:value="registerForm.username"/>
      </Form.Item>
      <Form.Item
        name="password"
        :rules="[{ required: true, message: '请输入密码' }]"
      >
        <Input placeholder="密码" v-model:value="registerForm.password"/>
      </Form.Item>
      <Form.Item
        name="password"
        :rules="[{ required: true, message: '请确认密码' }]"
      >
        <Input placeholder="确认密码" v-model:value="registerForm.confirmPassword"/>
      </Form.Item>
      <div class="register-btn">
        <Button type="link" size="small" @click="changeActionType(0)">登 录</Button>
      </div>
      <Button type="primary" block html-type="submit" :loading="loading">注 册</Button>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Form, Input, Button } from 'ant-design-vue'
import { reactive, ref } from 'vue'

const actionType = ref(0)  // 0是登录, 1是注册
const loading = ref(false)
const loginForm = reactive({
  username: "",
  password: ""
})
const registerForm = reactive({
  username: "",
  password: "",
  confirmPassword: ""
})
function onFinish(values: any) {
  console.log(values)
}
function changeActionType(type: number) {
  actionType.value = type
  if(type === 0) {
    loginForm.username = loginForm.password = ""
  } else registerForm.username = registerForm.password = registerForm.confirmPassword = ""
}
</script>

<style lang="scss" scoped>
h3 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 25px;
  font-weight: normal;
}
.register-btn {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  margin-top: -5px;
}
</style>