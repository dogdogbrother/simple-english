import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './routes'
import './assets/style/reset.css'
import './assets/style/attribute.css'
import 'ant-design-vue/dist/antd.less'


const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.mount('#app')

