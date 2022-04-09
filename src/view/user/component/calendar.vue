<template>
  <div class="btns">
    <RadioGroup v-model:value="thisYear" :default-value="thisYear" button-style="solid">
      <radio-button 
        v-for="year in yaerList"
        :value="year"
      >{{year}}</radio-button>
    </RadioGroup>
  </div>
  <div class="calendar-wrap">
    <main>
      <ul class="month">
        <li>1月</li>
        <li style="margin-top: -10px">6月</li>
        <li>12月</li>
      </ul>
      <ul class="calendar">
        <li 
          v-for="[key, value] in Object.entries(yearAllDays)"
          :key="key"
          :class="getActiveLevel(value as number)"
        >
          <Tooltip>
            <template #title>
            {{key}}
            </template>
            <div class="empty" :class="{'to-day': key === today}"></div>
          </Tooltip>
        </li>
      </ul>
    </main>
    <ul class="level-list">
      <li v-for="(level, index) in levelList" :key="level" :class="`active-${index + 1}`">
        <Tooltip>
          <template #title>
          {{level}}
          </template>
          <div class="empty"></div>
        </Tooltip>
      </li>
    </ul>
  </div>
  
</template>

<script setup lang="ts">
import dayjs from "dayjs"
import { RadioGroup, RadioButton, Tooltip } from 'ant-design-vue'
import { ref } from 'vue'
import { getYearAllActive } from '@/api/active'
import { activeType } from "@/type/active";
import { useRoute } from "vue-router";

const yaerList = ref(['2022'])
const thisYear = ref(yaerList.value[0])

const yearAllDays = ref(getYearAllDay(thisYear.value))
const levelList = ['碰了下而已', '稍微背了下单词', '静下心学习了', '很努力', '即将成神']
const today = dayjs().format('YYYY-MM-DD')
const { userId } = useRoute().params
/**
 * @description 获取一年全部的天数,用dayjs计算出每个月的,然后拼装成一个对象
 * @param year '2022'
 * @returns 
 */
function getYearAllDay(year: string) {
  const allDay: any = {}
  const allMonth = 12
  for (let _month = 1; _month <= allMonth; _month ++) {
    // 得到'01'
    const month = _month.toString().padStart(2, '0')
    // 2022-01
    const yearMonth = `${year}-${month}`
    // 每月多少天 31
    const monthDays = dayjs(yearMonth).daysInMonth()
    for (let _day = 1; _day <= monthDays; _day++) {
      const day = _day.toString().padStart(2, '0')
      const yearMonthDay = `${thisYear.value}-${month}-${day}`
      allDay[yearMonthDay] = 0
    }
  }
  return { ...allDay } 
}
function getYearAllActiveFn() {
  getYearAllActive(thisYear.value, userId as string).then((res: any) => {
    res.forEach((day: activeType) => {
      yearAllDays.value[day.createdTime] = day.active
    })
  })
}
// 根据 active 的值给出活动等级,组装到className
function getActiveLevel(active: number) {
  if (!active) return ''
  if (active < 5) {
    return 'active-1'
  }
  if (active < 10) {
    return 'active-2'
  }
  if (active < 30) {
    return 'active-3'
  }
  if (active < 50) {
    return 'active-4'
  }
  if (active < 70) {
    return 'active-5'
  }
}
// 初始化代码
getYearAllActiveFn()
</script>

<style lang="scss" scoped>
.calendar-wrap {
  margin-top: 20px;
  border: 1px solid rgba($color: #666, $alpha: 0.3);
  border-radius: 6px;
  width: 100%;
  padding: 10px;
  /* height: 245px; */
  main {
    display: flex;
    align-items: stretch;
    height: 100%;
    .month {
      margin: 0;
      height: 204px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 12px;
      padding: 4px 0;
      flex-shrink: 0;
      margin-right: 4px;
      li {
        transform: scale(0.8);
        text-align: center;
      }
    }
  }
}
.calendar {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  li {
    border-radius: 2px;
    width: 13px;
    height: 13px;
    margin: 2px;
    background-color: rgba($color: #666, $alpha: 0.1);
    cursor: pointer;
    &:hover {
      background-color: rgba($color: #666, $alpha: 0.3);
    }
  }
  .to-day {
    border: 1px solid rgba($color: #666, $alpha: 0.6);
  }
}
.level-list {
  margin: 0;
  display: flex;
  justify-content: flex-end;
  padding-right: 8px;
  li {
    padding: 2px 0;
    height: 17px;
    width: 13px;
    height: 13px;
    margin-left: 3px;
    cursor: pointer
    ;
  }
}

.active-1 {
  background-color: rgba($color: #006E00, $alpha: 0.2) !important;
}
.active-2 {
  background-color: rgba($color: #006E00, $alpha: 0.4) !important;
}
.active-3 {
  background-color: rgba($color: #006E00, $alpha: 0.5) !important;
}
.active-4 {
  background-color: rgba($color: #006E00, $alpha: 0.8) !important;
}
.active-5 {
  background-color: rgba($color: #006E00, $alpha: 1) !important;
}
.empty {
  width: 100%;
  height: 100%;
}
</style>