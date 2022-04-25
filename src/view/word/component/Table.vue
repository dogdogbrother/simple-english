<template>
  <Table
    :loading="props.loading"
    :columns="columns"
    :data-source="props.wordList"
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
        <Button type="link" block @click="onEditWord(record)">编辑</Button>
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

</template>

<script setup lang="ts">
import { wordType } from "@/type/word";
import { Table, Popconfirm, message, Button } from "ant-design-vue"
import { setWordPlan, delWord } from "@/api/word";
import { useRouter } from "vue-router";

const router = useRouter()

const props = defineProps<{
  loading: boolean,
  wordList: wordType[]
}>()

const emit = defineEmits(['showWordInfo', 'update'])

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
]

function showWordInfo(word: wordType) {
  emit('showWordInfo', word)
}

// 设置单词为陌生或者掌握
function setPlan(word: wordType, action: 0 | 1) {
  return new Promise((resolve) => {
    setWordPlan({
      action,
      keyWord: word.keyWord,
    }).then(() => {
      resolve(true);
      emit('update')
      message.success("设置成功");
    });
  });
}

function onEditWord(word: wordType) {
  const { noteId, id: wordId } = word
  router.push({
    path: `/addWord/${noteId}`,
    query: { wordId }
  })
}

function onDelWord(wordId: number) {
  return new Promise((resolve) => {
    delWord(wordId).then(() => {
      resolve(true);
      emit('update')
      message.success("删除成功");
    });
  });
}

const planMap: { [key: string]: string } = {
  "0": "陌生",
  "1": "见过",
  "2": "眼熟",
  "3": "了解",
  "4": "了解",
  "5": "熟悉",
  "6": "掌握",
}
</script>