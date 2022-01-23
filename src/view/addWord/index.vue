<template>
  <div class="wrap">
    <Form
      hideRequiredMark 
      :label-col="{span: 5}" 
      @finish="onAddWord"
      :model="form"
    >
      <Form.Item 
        label="单词"
        name="word"
        :has-feedback="checkWordStatus !== 0"
        @input="initCheckStatus"
        :validate-status="statusMap[checkWordStatus]"
        :help="getHelp(checkWordStatus)"
        :rules="[{ required: true, message: '请输入单词' }]"
      >
        <Input v-model:value="form.word" @blur="checkWordAndGetInfo"/>
      </Form.Item>
      <Form.Item label="有道翻译" v-if="youdaoExplain.word">
        <div class="youdao-card">
          <div class="translation">
            <h4>{{youdaoExplain.word}}</h4>
            <span>{{youdaoExplain.translation}}</span>
          </div>
          <div 
            v-if="youdaoExplain.isWord" 
            class="phonetic" 
            flex-s
          >
            <div class="uk" m-r-20>
              <span m-r-5>英: [{{youdaoExplain.ukPhonetic}}]</span>
              <SoundOutlined pointer @click="playPhonetic('uk')"/>
            </div>
            <div class="us">
              <span m-r-5>美: [{{youdaoExplain.usPhonetic}}]</span>
              <SoundOutlined pointer @click="playPhonetic('us')" />
            </div>
          </div>
          <ul class="explain">
            <li v-for="explain in youdaoExplain.explains">{{explain}}</li>
          </ul>
          <div v-if="youdaoExplain.webdict">
            <a :href="youdaoExplain.webdict" target="_blank">查看有道词典</a>
          </div>
        </div>
      </Form.Item>
      <Form.Item
        label="笔记内容"
        name="chineseMeaning"
      >
        <Textarea 
          v-model:value="form.chineseMeaning"
          :autoSize="{ minRows: 3, maxRows: 6 }"
        ></Textarea>
      </Form.Item>
      <Form.Item label="笔记图片">
        <Upload
          action="/api/upload/illustration"
          :headers="{
            Authorization: getToken()
          }"
          @change="upload"
          list-type="picture"
        >
          <Button><UploadOutlined/> upload </Button>
        </Upload>

      </Form.Item>
      <Form.Item :wrapper-col="{offset: 5}">
        <Button 
          :loading="loading"
          type="primary" 
          html-type="submit"
        >创建</Button>
      </Form.Item>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Form, Input, Button, Textarea, message, Upload } from 'ant-design-vue'
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { addWord, checkNoteWord, getYoudao } from '@/api/word'
import { SoundOutlined, UploadOutlined } from '@ant-design/icons-vue'

const loading = ref(false)
const router = useRouter()
const checkWordStatus = ref<0 | 1 | 2 | 3>(0)  // 0 是未校验, 1 是loading, 2 是成功, 3 是失败

const { noteId } = useRoute().params
type StatusType = '' | 'validating' | 'success' | 'error'
const statusMap: {[key: number]: StatusType } = {
  0: '',
  1: 'validating',
  2: 'success',
  3: 'error'
}
const form = reactive({
  word: '',
  chineseMeaning: ''
})
const youdaoExplain = ref<any>({})
// 用于播放音标的实例
let ukAudio: any = null
let usAudio: any = null
function onAddWord() {
  addWord({
    ...form,
    noteId
  }).then(() => {
    router.back()
  }).catch(err => {
    message.error(err.msg)
  })
}

function initCheckStatus() {
  if (checkWordStatus.value !== 0) checkWordStatus.value = 0
  if (youdaoExplain.value) youdaoExplain.value = {}
}
// 检查此单词是否在此单词本中存在, 并且获取该单词的道翻译
function checkWordAndGetInfo() {
  if(!form.word) return
  checkWordStatus.value = 1
  Promise.all([checkWord(), youdao()]).then(() => {
    checkWordStatus.value = 2
  }).catch(() => {
    checkWordStatus.value = 3
  })
}

function checkWord() {
  return new Promise((resolve: any, reject: any) => {
    checkNoteWord(noteId as string, form.word).then(() => {
      resolve()
    }).catch(() => reject())
  })
}

function youdao() {
  return new Promise((resolve: any, reject: any) => {
    getYoudao({
      word: form.word
    }).then(res => {
      youdaoExplain.value = res
      const { ukSpeech, usSpeech } = res as any
      // 生成音频实例
      if (ukSpeech) {
        ukAudio = new Audio(ukSpeech)
      }
      if (usSpeech) {
        usAudio = new Audio(usSpeech)
      }
      resolve()
    }).catch(err => reject(err.msg))
  })
}
// 即便状态是3,也有2种可能,单词存在或者翻译失败
function getHelp(status: number) {
  if (status === 3) {
    if (youdaoExplain.value.word) {
      return '单词已存在,请勿重复录入'
    }
    return '翻译失败了呀,得检查下单词是否正常'
  }
}

// us 或者 uk
function playPhonetic(action: String) {
  if (action === 'uk') {
    usAudio.pause()
    ukAudio.play()
  }
  if (action === 'us') {
    ukAudio.pause()
    usAudio.play()
  }
}

function getToken() {
  const token = localStorage.getItem('token')
  if (token) {
    return `Bearer ${token}`
  } 
}

function upload(fn: any) {
  console.log(fn);
  
}
</script>

<style lang="scss" scoped>
.wrap {
  width: 90%;
  width: 400px;
  margin: 0 auto;
  padding: 10px 0;
}
.youdao-card {
  width: 100%;
  padding: 5px 10px;
  border: 1px solid rgb(217, 217, 217);
  background-color: #fff;
  border-radius: 4px;
  .translation {
    h4 {
      font-weight: bold;
      font-size: 20px;
      margin: 0 20px 0 0;
    }
    span {
      color: #555;
    }
  }
  .explain {
    li {
      margin-bottom: 10px;
    }
  }
}
.phonetic {
  color: #666;
  margin-bottom: 10px;
}
</style>