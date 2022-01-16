<template>
  <ul>
    <li 
      pointer
      v-for="note: any in props.noteList" 
      @click="toWord(note.id)"
      :style="getCover(note.noteCover)"
    >
      <div class="mask">
        <h4>{{note.noteName}}</h4>
        <p class="summary" ellipsis>单词本描述: {{note.noteSummary}}</p>
        <p class="word-count">单词数量: {{note.wordCount}}个</p>
        <div clang="footer" flex-b>
          <span class="btn" @click.stop="toAddWord(note.id)">添加单词</span>
          <div class="user-info" flex-b>
            <Avatar :src="getUserAvatar(note.user.avatar)" size="small"/>
            <span>{{note.user.nickname}}</span>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { Avatar } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { getNoteCover, getUserAvatar } from '@/utils'
const router = useRouter()

const props = defineProps({
  noteList: Array
})

function toWord(noteId: number) {
  router.push(`/word/${noteId}`)
}

function toAddWord(noteId: number) {
  router.push(`/addWord/${noteId}`)
}

function getCover(noteCover: string) {
  return `background-image: url(${getNoteCover(noteCover)});`
}

</script>

<style lang="scss" scoped>
ul {
  display: flex;
  margin-right: -20px;
  flex-wrap: wrap;
  li {
    overflow: hidden;
    width: 300px;
    height: 150px;
    border: 1px solid rgba($color: #999, $alpha: 0.25);
    border-radius: 8px;
    margin: 0 20px 20px 0;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    transition: all .5s;
    transform: translateY(0);
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 8px 0px;
      transform: translateY(-2px);
      .mask {
        background: rgba($color: #000, $alpha: .4)
      }
    }
  }
  h4 {
    font-size: 20px;
    margin-bottom: 5px;
    color: rgba($color: #fff, $alpha: 1);
  }
  .summary {
    color: rgba($color: #fff, $alpha: 0.9);
  }
  .word-count {
    color: rgba($color: #fff, $alpha: 0.9);
  }
  .btn {
    color: #fff;
    font-weight: bold;
    text-decoration: underline;
    font-size: 14px;
  }
}
.mask {
  transition: all .5s;
  width: 100%;
  height: 100%;
  padding: 5px 10px;
  background: rgba($color: #000, $alpha: .2)
}
.user-info {
  width: 50px;
  span {
    color: rgba($color: #fff, $alpha: 0.9);
  }
}
</style>