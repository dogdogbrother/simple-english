<template>
  <div>
    <h3>{{actionType === 0 ? "登 录" : "注 册"}}</h3>
    <Form 
      :model="loginForm" 
      @finish="onLoginFinish" 
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
        <InputPassword placeholder="密码" v-model:value="loginForm.password"/>
      </Form.Item>
      <div class="register-btn">
        <Button type="link" size="small" @click="changeActionType(1)">注 册</Button>
      </div>
      <Button type="primary" block html-type="submit" :loading="loading">登 录</Button>
    </Form>
    <Form 
      :model="registerForm" 
      @finish="onRegisterFinish" 
      autocomplete="off"
      v-else
    >
      <Form.Item
        name="username"
        :rules="[
          { required: true, message: '请输入用户名' },
          { min: 3, max: 9, message: '请输入3~9字符的用户名' }
        ]"
      >
        <Input autocomplete="off" placeholder="账号" v-model:value="registerForm.username"/>
      </Form.Item>
      <Form.Item
        name="password"
        :rules="[
          { required: true, message: '请输入密码' },
          { min: 6, max: 12, message: '为了安全,密码请设置6~12位'}
        ]"
      >
        <InputPassword placeholder="密码" v-model:value="registerForm.password" />
      </Form.Item>
      <Form.Item
        name="affirmPassword"
        :rules="[
          { required: true, message: '请确认密码' },
          { min: 6, max: 12, message: '为了安全,密码请设置6~12位'}
        ]"
      >
        <InputPassword placeholder="确认密码" v-model:value="registerForm.affirmPassword" />
      </Form.Item>
      <div class="register-btn">
        <Button type="link" size="small" @click="changeActionType(0)">登 录</Button>
      </div>
      <Button type="primary" block html-type="submit" :loading="loading">注 册</Button>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Form, Input, Button, message, InputPassword } from 'ant-design-vue'
import { reactive, ref } from 'vue'
import { register, login } from  '@/api/user'
import { useRouter } from 'vue-router'
import { loginType, registerType } from '@/type/user'

const router = useRouter()

const actionType = ref(0)  // 0是登录, 1是注册
const loading = ref(false)
const loginForm = reactive<loginType>({
  username: "",
  password: ""
})
const registerForm = reactive<registerType>({
  username: "",
  password: "",
  affirmPassword: ""
})
function onLoginFinish(values: loginType) {
  onsubmit(1, values)
}
function onRegisterFinish(values: registerType) {
  onsubmit(2, values)
}

function onsubmit(type: number, values: loginType | registerType) {
  const fn = type === 1? login : register
  loading.value = true
  fn(values).then(res => {
    const { token } = res as any
    localStorage.setItem("token", token)
    router.push("/note")
  }).catch(error => {
    loading.value = false
    message.error(error.msg)
  })
}

function changeActionType(type: number) {
  actionType.value = type
  if(type === 0) {
    loginForm.username = loginForm.password = ""
  } else registerForm.username = registerForm.password = registerForm.affirmPassword = ""
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