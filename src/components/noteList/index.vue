<template>
  <ul>
    <li 
      pointer
      v-for="note in props.noteList" 
      @click="toWord(note.id)"
      :style="getCover(note.noteCover)"
    >
      <div class="mask">
        <h4>{{note.noteName}}</h4>
        <p class="summary" ellipsis>单词本描述: {{note.noteSummary}}</p>
        <p class="word-count">单词数量: {{note.wordCount}}个</p>
        <div clang="footer" flex-b>
          <span 
            v-if="userStore.userInfo.id == note.userId"
            class="btn" 
            @click.stop="toAddWord(note.id)"
          >添加单词</span>
          <!-- 单纯写个空标签 为了 flex 布局 -->
          <i v-else></i>
          <div class="user-info" flex-b  @click.stop="toUser(note.user.id as number)">
            <Avatar :src="note.user.avatar" size="small"/>
            <span ellipsis>{{note.user.nickname}}</span>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { Avatar } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { noteType } from '@/type/note'
import { useUserStore } from '@/store'

const router = useRouter()

const userStore = useUserStore()

const props = defineProps<{
  noteList: noteType[]
}>()

function toWord(noteId: string | number) {
  router.push(`/word/${noteId}`)
}
function toAddWord(noteId: string | number) {
  router.push(`/addWord/${noteId}`)
}
function toUser(userId: string | number) {
  window.open(`/user/${userId}`)
}
function getCover(noteCover: string) {
  return `background-image: url(${noteCover});`
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
  min-width: 50px;
  max-width: 92px;
  &:hover span{
    text-decoration: underline;
  }
  span {
    margin-left: 5px;
    font-size: 12px;
    color: rgba($color: #fff, $alpha: 0.9);
  }
}
</style>