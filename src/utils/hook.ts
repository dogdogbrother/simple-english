import { useUserStore } from '@/store'
import { wordType } from '@/type/word'

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


/**
 * @description 自动播放音标,要看用户默认是美标us还是英标uk
 * @param {wordType} word 
 */
export function useAutoPlay(action: '1' | '2', word?: wordType, ) {
  if (!word) return
  const userInfo = useUserStore()
  const isAutoplay = userInfo.userInfo.autoPlay.includes(action)
  // 假如没有自动播放的权限就暂停
  if (!isAutoplay) return
  const { ukSpeech, usSpeech } = word.youdao

  if (!userInfo.userInfo.autoPlay) return
  if (userInfo.userInfo.defaultPhonetic === 'uk') {
    const _audio = new Audio(ukSpeech || usSpeech)
    _audio.play()
  }
  if (userInfo.userInfo.defaultPhonetic === 'us') {
    const _audio = new Audio(usSpeech ||  ukSpeech)
    _audio.play()
  }
}