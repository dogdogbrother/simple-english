import { useUserStore } from '@/store'

/**
 * @description 判断当前用户是不是我自己
 * @param {string} userId 用户id
 * @returns {boolean} true 就是我自己,提供个变量返回结果,再提供个函数返回结果
 */
export function useIsMe(userId?: string | number) {
  const userInfo = useUserStore()
  function isMeFn(_userId: string) {
    return userInfo.userInfo.id == _userId
  }
  return {
    isMe: userInfo.userInfo.id == userId,
    isMeFn
  }
}