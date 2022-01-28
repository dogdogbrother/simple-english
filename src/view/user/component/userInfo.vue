<template>
  <div class="user-card">
    <div v-if="!isEdit">
      <UserShow :user="userInfo"/>
      <Button 
        v-if="props.userId == props._userId"
        class="edit-btn" 
        type="primary"
        @click="isEdit = true"
      >编辑资料</Button>
    </div>
    <div v-else class="form-wrap">
      <Form
        hideRequiredMark 
        :label-col="{span: 4}" 
        @finish="editUser"
        :model="form"
      >
        <Form.Item
          label="用户昵称"
          name="nickname"
          :rules="[{ required: true, message: '请输入昵称' }]"
        >
          <Input placeholder="昵称" v-model:value="form.nickname"/>
        </Form.Item>
        <Form.Item
          label="个人简介"
          name="introduce"
        >
          <Textarea placeholder="个人简介" v-model:value="form.introduce"></Textarea>
        </Form.Item>
        <Form.Item :wrapper-col="{offset: 4}">
          <Button 
            :loading="loading"
            type="primary" 
            html-type="submit"
          >修改个人信息</Button>
        </Form.Item>
      </Form>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { oneUserInfo } from '@/api/user'
import { ref, reactive } from 'vue'
import { Form, Input, Textarea, Button } from 'ant-design-vue'
import UserShow from '@/widget/userShow.vue'
import { userInfoType } from '@/type/user'

const props = defineProps({
  userId: String,
  _userId: String,  // 登录的这个人的userId
})

const userInfo = ref<userInfoType>({})
const isEdit = ref(false)
const form = reactive<userInfoType>({
  avatar: '',
  nickname: '',
  introduce: '',
})
const loading = ref(false)

oneUserInfo(props.userId as string).then((res) => {
  const resData = res as userInfoType
  userInfo.value = resData
  const { username, nickname, avatar, introduce } = resData
  form.nickname = nickname || username
  form.avatar = avatar
  form.introduce = introduce
})

function editUser(values: userInfoType) {
  console.log(values)
}
</script>

<style lang="scss" scoped>
.user-card {
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  position: relative;
  margin-bottom: 10px;
}

.edit-btn {
  position: absolute;
  bottom: 20px;
  right: 20px;
}
.form-wrap {
  width: 70%;
  min-width: 300px;
  max-width: 400px;
  margin: 0 auto;
}
</style>