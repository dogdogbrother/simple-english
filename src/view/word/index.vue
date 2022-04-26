<template>
  <UseUser ref="useUserRef" />
  <p m-b-20>笔记本简介: {{noteSummary}}</p>
  <div m-b-20 v-if="useStore.userInfo.useNote == noteId">
    <span m-r-10>已掌握{{ studyProgress.grasp }}个单词</span>
    <span m-r-10>{{ studyProgress.studying }}个单词学习中</span>
    <span>{{ studyProgress.notStarted }}单词未学习</span>
  </div>
  <!-- 如果单词有内容,而且不是我在用的单词本,就可以切换 -->
  <div v-else-if="studyProgress.all && useStore.userInfo.useNote != noteId">
    <Popconfirm
      v-if="useStore.userInfo.useNote"
      placement="bottom"
      ok-text="确定"
      cancel-text="不了"
      title="你已经有了正在学习中的单词本了,确定要切换吗"
      @confirm="selecNote"
    >
      <Button type="primary" :loading="useLoading">切换到此单词本</Button>
    </Popconfirm>
    <Button v-else type="primary" @click="selecNote" :loading="useLoading"
      >切换到此单词本</Button
    >
  </div>
  <Form
    m-b-20
    :model="form"
    layout="inline"
    autocomplete="off"
    @finish="onSearch"
  >
    <Item label="单词" name="word">
      <Input v-model:value="form.word" />
    </Item>
    <Item label="熟练度" name="planType">
      <Select v-model:value="form.planType">
        <Option value="">全部</Option>
        <Option value="1">未学习</Option>
        <Option value="2">学习中</Option>
        <Option value="3">已掌握</Option>
      </Select>
    </Item>
    <Item>
      <Button type="primary" html-type="submit" :loading="searchLoading"
        >搜索</Button
      >
    </Item>
  </Form>
  <Table 
    :loading="searchLoading" 
    :wordList="wordList" 
    @showWordInfo="showWordInfo"
    @update="onSearch"
  >
  </Table>
  <Drawer
    v-if="_isPc"
    :visible="drawerState"
    @close="drawerState = false"
    placement="left"
    width="500"
  >
    <WordInfo ref="wordInfo" />
  </Drawer>
  <Drawer
    v-else
    :visible="drawerState"
    @close="drawerState = false"
    placement="bottom"
    height="500"
  >
    <WordInfo ref="wordInfo" />
  </Drawer>
</template>

<script setup lang="ts">
import { getNoteWord } from "@/api/word";
import { useNote, getNoteInfo } from "@/api/note";
import { useRoute } from "vue-router";
import {
  Form,
  Input,
  Select,
  Button,
  Popconfirm,
  Drawer,
} from "ant-design-vue";
import Table from './component/MyTable.vue'
import { ref, nextTick, reactive } from "vue";
import { useUserStore } from "@/store";
import { wordType } from "@/type/word";
import UseUser from "./component/useUser.vue";
import { getCurrentInstance } from "@vue/runtime-core";
import WordInfo from "./component/wordInfo.vue";
import { isPc } from "@/utils";
const { Item } = Form;
const { Option } = Select;
interface formType {
  word: string;
  planType: "" | "1" | "2" | "3"; // 全部 未学习 学习中 已掌握
}
const form: formType = reactive({
  word: "",
  planType: "",
});
const currentInstance: any = getCurrentInstance();
const { noteId } = useRoute().params;
const wordList = ref<wordType[]>([]);
const useStore = useUserStore();
const useLoading = ref(false);
const searchLoading = ref(false);
const drawerState = ref(false); // 抽屉的开关
const noteSummary = ref('')  // 笔记本简介
// pc端和移动端抽屉配置稍有不同
const _isPc = ref(isPc);
const studyProgress = ref({
  all: 0,
  grasp: 0,
  notStarted: 0,
  studying: 0,
});
// 切换单词本
function selecNote() {
  useLoading.value = true;
  useNote(noteId)
    .then(() => {
      // userInfo 下 的 useNote 字段更新了
      useStore.setUserInfo();
      currentInstance.proxy.$refs.useUserRef.getWordUseUserFn();
    })
    .finally(() => (useLoading.value = false));
}
// 显示单词的具体内容
async function showWordInfo(word: wordType) {
  drawerState.value = true;
  await nextTick();
  currentInstance.proxy.$refs.wordInfo.setWordInfo(word);
}
function onSearch(values = form) {
  searchLoading.value = true;
  getNoteWord(noteId as string, values)
    .then((res: any) => {
      const { words, ..._studyProgress } = res;
      wordList.value = words;
      studyProgress.value = _studyProgress;
    })
    .finally(() => (searchLoading.value = false));
}
onSearch();
getNoteInfo(noteId).then((res: any) => {
  noteSummary.value = res.noteSummary
})
</script>

<style lang="scss" scoped>
.oprate-btns {
  display: flex;
  align-items: center;
  margin-right: -20px;
  > * {
    margin-right: 20px;
    margin-bottom: 20px;
  }
}
.table {
  width: 100%;
  max-width: 900px;
  margin-bottom: 20px;
}
.word {
  font-weight: bold;
  color: #285cbe;
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    color: #4b7dcc;
  }
}
</style>
