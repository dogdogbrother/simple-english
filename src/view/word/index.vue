<template>
  <UseUser ref="useUserRef" />
  <div m-b-20 v-if="useStore.userInfo.useNote == noteId">
    <span m-r-10>已掌握{{ studyProgress.grasp }}个单词</span>
    <span m-r-10>{{ studyProgress.studying }}个单词学习中</span>
    <span>{{ studyProgress.notStarted }}单词未学习</span>
  </div>
  <!-- 如果单词有内容,而且不是我在用的单词本,就可以切换 -->
  <div v-else-if="wordList.length && useStore.userInfo.useNote != noteId">
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
    :columns="columns"
    :data-source="wordList"
    bordered
    class="table"
    :pagination="false"
  >
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'keyWord'">
        <span class="word" @click="showWordInfo(record)">{{ text }}</span>
      </template>
      <template v-if="column.dataIndex === 'youdao'">
        {{ record.youdao.translation }}
      </template>
      <template v-if="column.dataIndex === 'plan'">
        {{ planMap[text] || "未学习" }}
      </template>
      <template v-if="column.dataIndex === 'operate'">
        <Popconfirm
          ok-text="确定"
          cancel-text="不了"
          title="是否对此单词设置为陌生"
          @confirm="setPlan(record, 0)"
        >
          <Button type="link" block>陌生</Button>
        </Popconfirm>
        <Popconfirm
          ok-text="确定"
          cancel-text="不了"
          title="是否对此单词设置为掌握"
          @confirm="setPlan(record, 1)"
        >
          <Button type="link" block>掌握</Button>
        </Popconfirm>
        <Button type="link" block @click="onEditWord">编辑</Button>
        <Popconfirm 
          ok-text="确定" 
          cancel-text="不了" 
          title="是否删除此单词"
          @confirm="onDelWord(record.id)"
        >
          <Button type="link" block>删除</Button>
        </Popconfirm>
      </template>
    </template>
  </Table>
  <div class="oprate-btns">
    <Popconfirm
      v-if="useStore.userInfo.useNote"
      placement="bottom"
      ok-text="确定"
      cancel-text="不了"
      title="你已经有了正在学习中的单词本了,确定要切换吗"
      @confirm="selecNote"
    >
      <Button
        v-if="useStore.userInfo.useNote != noteId"
        type="primary"
        :loading="useLoading"
        >{{ useLoading ? "正在切换中" : "切换到此单词本" }}</Button
      >
    </Popconfirm>
    <Button
      v-else-if="useStore.userInfo.useNote != noteId"
      type="primary"
      @click="selecNote"
      :loading="useLoading"
      >{{ useLoading ? "正在切换中" : "切换到此单词本" }}</Button
    >
  </div>
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
import { getNoteWord, setWordPlan, delWord } from "@/api/word";
import { useNote } from "@/api/note";
import { useRoute } from "vue-router";
import {
  Form,
  Input,
  Select,
  Button,
  Table,
  Popconfirm,
  Drawer,
  message,
} from "ant-design-vue";
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
// pc端和移动端抽屉配置稍有不同
const _isPc = ref(isPc);
const studyProgress = ref({
  grasp: 0,
  notStarted: 0,
  studying: 0,
});

const planMap: { [key: string]: string } = {
  "0": "陌生",
  "1": "见过",
  "2": "眼熟",
  "3": "了解",
  "4": "了解",
  "5": "熟悉",
  "6": "掌握",
};

const columns: any = [
  {
    title: "单词",
    dataIndex: "keyWord",
    key: "id",
  },
  {
    title: "翻译",
    dataIndex: "youdao",
  },
  {
    title: "学习进度",
    dataIndex: "plan",
    width: "100px",
  },
  {
    title: "操作",
    dataIndex: "operate",
    width: "15%",
    minWidth: "40px",
    maxWidth: "100px",
  },
];

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

// 设置单词为陌生或者掌握
function setPlan(word: wordType, action: 0 | 1) {
  return new Promise((resolve) => {
    setWordPlan({
      action,
      keyWord: word.keyWord,
    }).then(() => {
      resolve(true);
      onSearch();
      message.success("设置成功");
    });
  });
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

function onDelWord(wordId: number) {
  return new Promise((resolve) => {
    delWord(wordId).then(() => {
      resolve(true);
      onSearch();
      message.success("删除成功");
    });
  });
}
function onEditWord() {
  alert('过几天工作不忙了,我再补上编辑功能')
}
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
