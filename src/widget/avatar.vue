<template>
  <Avatar :src="props.user.avatar" />
</template>

<script setup lang="ts">
import { Avatar } from 'ant-design-vue'

const props: any = defineProps({
  user: Object,
})

</script>