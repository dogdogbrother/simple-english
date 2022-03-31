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
        :validate-status="statusMap[checkWordStatus]"
        :help="getHelp(checkWordStatus)"
        :rules="[{ required: true, message: '请输入单词' }]"
      >
        <Input @input="initCheckStatus" v-model:value="form.word" @blur="checkWordAndGetInfo"/>
      </Form.Item>
      <Form.Item label="有道翻译" v-if="youdaoExplain.word">
        <div class="youdao-card">
          <div class="translation">
            <h4>{{youdaoExplain.word}}</h4>
            <span>{{youdaoExplain.translation}}</span>
          </div>
          <Phonetic :phonetic="youdaoExplain" m-b-10 m-t-5 v-if="youdaoExplain.isWord"/>
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
        name="wordMark"
      >
        <Textarea 
          v-model:value="form.wordMark"
          :autoSize="{ minRows: 3, maxRows: 6 }"
        ></Textarea>
        <Row m-t-10 flex-s>
          <span :wrapper-col="{offset: 5}"></span>
          <div flex-1>
            <Upload
              accept="image/*"
              :customRequest="customUpload"
              @change="upload"
              list-type="picture"
            >
              <div class="upload-btn">
                <a href="javascript:;">
                  点击上传笔记图片
                  <span v-if="uploadLoading">(正在努力上传图片中...)</span>
                </a>
              </div>
            </Upload>
          </div>
        </Row>
      </Form.Item>
      <Form.Item :wrapper-col="{offset: 5}">
        <Button 
          :loading="loading || uploadLoading"
          type="primary" 
          html-type="submit"
        >创建</Button>
      </Form.Item>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Form, Input, Button, Textarea, message, Upload, Row } from 'ant-design-vue'
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { addWord, checkNoteWord, getYoudao } from '@/api/word'
import { uploadImg } from '@/api/upload'
import Phonetic from '@/widget/phonetic.vue'
import { youdaoType } from '@/type/word'

const loading = ref(false)
const uploadLoading = ref(false)
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
  wordMark: ''
})
const fileList = ref<any>([])
const youdaoExplain = ref<youdaoType>({})

function onAddWord() {
  if (checkWordStatus.value !== 2) return
  const _fileList = fileList.value
    .filter((file :any) => file.status === 'done')
    .map((file :any) => file.response)
  addWord({
    ...form,
    noteId,
    fileList: _fileList,
    keyWord: youdaoExplain.value.word
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
    }).then((res: any) => {
      youdaoExplain.value = res
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

function customUpload(fileEvent: any) {
  const { onProgress, onSuccess, onError, file } = fileEvent
  const formData = new FormData()
  formData.append('file', file);
  uploadImg(formData, (progressEvent: any) => {
    let complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
    onProgress(complete, file)
  }).then(res => {
    onSuccess(res, file)
  }).catch(() => onError("上传图片失败", file))
}
function upload(fileEvent: any) {
  const { status } = fileEvent.file
  console.log(status)
  if (status === 'uploading') {
    uploadLoading.value = true
  } else  uploadLoading.value = false
  fileList.value = fileEvent.fileList
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
.upload-btn {
  span {
    font-size: 12px;
    color: rgba($color: #666, $alpha: 0.6);
  }
}
</style>