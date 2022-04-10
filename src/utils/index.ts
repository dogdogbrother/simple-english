import dayjs from "dayjs"

// 判断是不是pc
export const isPc = !navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)

/**
 * @description 传入时间,返回距离当前时间的描述.
 *    60分钟前,1小时前,昨天,前天,超过3天的显示日期时间
 * @param {string} time 2022-12-32 11:02:11
 */
const minute_60 = 60  // 一小时的分钟数
const hour_24 = 1440  // 一天的分钟数
const day_2 = 1440 * 2
const day_3 = 1440 * 3
const day_30 = 1440 * 30
export function calculateCreateTime(time: string) {
  const nowTime = dayjs(new Date())
  const preTime = dayjs(time)
  const diffDayMillisecond = nowTime.diff(preTime, 'minute')
  if (diffDayMillisecond < minute_60) {
    return diffDayMillisecond + '分钟前'
  }
  if (diffDayMillisecond < hour_24) {
    return accurateNum(diffDayMillisecond / minute_60) + '小时前'
  }
  if (diffDayMillisecond < day_2) {
    return '昨天'
  }
  if (diffDayMillisecond < day_3) {
    return '前天'
  }
  if (diffDayMillisecond < day_30) {
    return accurateNum(diffDayMillisecond / hour_24)  + '天前'
  }
  return time
}

/**
 * @description 传入个number,返回个整数
 */
export function accurateNum(number: number) {
  return number.toFixed()
}