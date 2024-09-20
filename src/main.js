import { createApp } from 'vue'
import routes from './router/index.js'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App);
app.use(routes);
app.use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app')