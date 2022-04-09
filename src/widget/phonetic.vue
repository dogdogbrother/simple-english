<template>
  <div class="phonetic" flex-s>
    <div class="uk" m-r-20 v-if="props.phonetic.ukPhonetic">
      <span m-r-5>英: [{{props.phonetic.ukPhonetic}}]</span>
      <SoundOutlined pointer @click="playPhonetic('uk')"/>
    </div>
    <div class="us" v-if="props.phonetic.usPhonetic">
      <span m-r-5>美: [{{props.phonetic.usPhonetic}}]</span>
      <SoundOutlined pointer @click="playPhonetic('us')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { SoundOutlined } from '@ant-design/icons-vue'
import { phoneticType } from '@/type/word'

const props = defineProps<{
  phonetic: phoneticType
}>()

// 用于播放音标的实例
// us 或者 uk
function playPhonetic(action: String) {
  if (action === 'uk') {
    const ukAudio = new Audio(props.phonetic.ukSpeech)
    ukAudio.play()
  }
  if (action === 'us') {
    const usAudio = new Audio(props.phonetic.usSpeech)
    usAudio.play()
  }
}
</script>

<style lang="scss" scoped>
.phonetic {
  color: #666;
}
</style>