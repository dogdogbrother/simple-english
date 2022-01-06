import axios from 'axios'
// import { message } from 'ant-design-vue';

const http = axios.create({
  baseURL: "/api"
})

http.interceptors.request.use(
  config => {
    // token 携带
    // const token = localStorage.getItem('token')
    // if (token) config.headers.Authorization = token
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
    return Promise.reject({
      status,
      msg
    })
  }
)

export default http