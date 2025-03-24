import { createApp } from 'vue'
import routes from './router/index.js'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

const app = createApp(App);
const VITE_APP_BASE_API = 'http://192.168.0.137:8088';
// const VITE_APP_BASE_API = 'http://localhost:8088';
window.VITE_APP_BASE_API = VITE_APP_BASE_API;
app.use(routes);
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(Antd)
app.mount('#app')