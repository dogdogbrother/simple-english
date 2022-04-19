<template>
  <div class="user-card">
    <div v-if="!isEdit" class="user-info">
      <UserShow :user="userInfo"/>
      <Button 
        v-if="props.userId == props._userId"
        m-l-5
        type="primary"
        @click="isEdit = true"
      >编辑资料</Button>
    </div>
    <div v-else class="form-wrap">
      <Form
        hideRequiredMark 
        :label-col="{span: 5}" 
        @finish="editUser"
        :model="form"
        labelAlign="left"
      >
        <Form.Item
          label="用户头像"
          name="avatar"
        > 
          <div flex-s>
            <Spin :spinning="uploadLoading">
              <Avatar :size="52" :src="form.avatar" />
            </Spin>
            <div class="file-wrap" m-l-10>
              <label for="file-input">更换头像</label>
              <input id="file-input" type="file" accept="image/*" @change="upload" />
            </div>
          </div>
        </Form.Item>
        <Form.Item
          label="用户昵称"
          name="nickname"
          :rules="[{ required: true, message: '请输入昵称' }]"
        >
          <Input placeholder="昵称" v-model:value="form.nickname" />
        </Form.Item>
        <Form.Item
          label="个人简介"
          name="introduce"
        >
          <Textarea placeholder="个人简介" v-model:value="form.introduce"></Textarea>
        </Form.Item>
        <Form.Item
          label="自动发音"
          name="autoPlay"
          extra="在背单词时或单词本页面查看词意时自动播放发音"
        >
          <CheckboxGroup v-model:value="form.autoPlay" :options="autoPlayOptions" />
        </Form.Item>
        <Form.Item
          label="默认音标"
          name="defaultPhonetic"
          extra="自动播放发音时默认发音"
        >
          <RadioGroup v-model:value="form.defaultPhonetic" :options="phoneticOptions"/>
        </Form.Item>
        <Form.Item :wrapper-col="{offset: 5}">
          <Button 
            :loading="loading"
            type="primary" 
            html-type="submit"
          >确定修改</Button>
          <Button m-l-10 @click="isEdit = false">取消修改</Button>
        </Form.Item>
      </Form>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { oneUserInfo } from '@/api/user'
import { ref, reactive } from 'vue'
import { 
  Form, 
  Input, 
  Textarea, 
  Button, 
  message, 
  CheckboxGroup, 
  RadioGroup,
  Avatar,
  Spin
} from 'ant-design-vue'
import UserShow from '@/widget/userShow.vue'
import { userInfoType } from '@/type/user'
import { updateUserInfo } from '@/api/user'
import { useUserStore } from '@/store'
import { uploadImg } from '@/api/upload'

const props = defineProps({
  userId: String,
  _userId: String,  // 登录的这个人的userId
})

const useStore = useUserStore()
const userInfo = ref<userInfoType>({})
const isEdit = ref(false)
const form = reactive<userInfoType>({
  avatar: '',
  nickname: '',
  introduce: '',
  autoPlay: [],
  defaultPhonetic: 'us'
})
const loading = ref(false)
const uploadLoading = ref(false)

const phoneticOptions = [
  { label: '美标', value: 'us' },
  { label: '英标', value: 'uk' }
]

const autoPlayOptions = [
  { label: '背单词卡片时', value: '1' },
  { label: '单词本查看释义时', value: '2' }
]

oneUserInfo(props.userId as string).then((res) => {
  setUserInfo(res as userInfoType)
})

function editUser(values: userInfoType) {
  loading.value = true
  updateUserInfo(values).then(res => {
    setUserInfo(res as userInfoType)
    useStore.updateUserInfo(res)
    isEdit.value = false
    message.success("更新用户信息完成")
  }).finally(() => loading.value = false)
}

function setUserInfo(data: userInfoType) {
  userInfo.value = data
  const { username, nickname, avatar, introduce, autoPlay, defaultPhonetic } = data
  form.nickname = nickname || username
  form.avatar = avatar
  form.introduce = introduce
  form.autoPlay = autoPlay
  form.defaultPhonetic = defaultPhonetic
}

function upload(e: Event) {
  const target = e.target as HTMLInputElement
  const file = (target.files as FileList)[0]
  const formData = new FormData()
  formData.append('file', file)
  uploadLoading.value = true
  uploadImg(formData).then((res: any) => {
    form.avatar = res
  }).finally(() => uploadLoading.value = false)
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
.user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.form-wrap {
  width: 70%;
  min-width: 300px;
  max-width: 400px;
  margin: 0 auto;
}
.file-wrap {
  position: relative;
  input {
    width: 0px;
    height: 0px;
  }
  label {
    color: #285CBE;
    cursor: pointer;
    &:hover {
      color: #4b7dcc;
    }
  }
}
</style>