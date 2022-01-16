
/**
 * @description 获取用户头像地址
 * @param string user.avatar
 */
export function getUserAvatar(avatar: string) {
  return `http://localhost:3009/avatar/${avatar}.jpeg`
}

/**
 * @description 获取单词本封面地址
 * @param string note.cover
 */
 export function getNoteCover(noteCover: string) {
  return `http://localhost:3009/noteCard/${noteCover}.jpg`
}