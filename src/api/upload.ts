import http from './config'

// 上传图片
export function uploadImg(form: any, onUploadProgress: any) {
  return http({
    url: '/upload/illustration',
    method: 'post',
    headers: {
      'content-type': 'multipart/form-data'
    },
    onUploadProgress,
    data: form
  })
}