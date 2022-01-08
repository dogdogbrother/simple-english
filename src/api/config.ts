import axios from 'axios'
import router from '@/routes'

const http = axios.create({
  baseURL: "/api"
})

http.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } 
    return config
  }
)
http.interceptors.response.use(
  response => {
    const { data, status: _ } = response
    return data
  },
  err => {
    const { data:msg = "网络错误", status = 500 } = err.response || {}
    if (status === 401) {
      router.push('/login')
    }
    return Promise.reject({
      status,
      msg
    })
  }
)

export default http