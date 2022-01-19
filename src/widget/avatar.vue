<template>
  <Avatar :src="getUserAvatar(props.user.avatar)" />
</template>

<script setup lang="ts">
import { Avatar } from 'ant-design-vue'
import { getUserAvatar } from '@/utils'

const props: any = defineProps({
  user: Object,
})

</script>