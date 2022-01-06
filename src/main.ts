import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Login from './view/login/index.vue'
import Notebook from './view/notebook/index.vue'

import './assets/style/reset.css'
import './assets/style/attribute.css'
import 'ant-design-vue/dist/antd.less'

const routes = [
  { path: '/login', component: Login },
  { path: '/notebook', component: Notebook },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)

app.use(router)

app.mount('#app')
