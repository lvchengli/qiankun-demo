import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import { registerMicroApps, start } from 'qiankun'
const apps = [
  {
    name: 'subapp-vue',
    entry: '//localhost:10011', // 通过fetch加载html，js并且动态执行，所以子应用必须支持跨域
    container: '#vue', // 容器
    activeRule: '/vue' // 激活条件
  },
  {
    name: 'subapp-react',
    entry: '//localhost:10012', // 通过fetch加载html，js并且动态执行，所以子应用必须支持跨域
    container: '#react', // 容器
    activeRule: '/react' // 激活条件
  }
]

const lifeCycles = {
  beforeLoad: () => {
    console.log('加载前')
  },
  beforeMount: () => {
    console.log('挂载前')
  },
  afterMount: () => {
    console.log('挂载后')
  },
  beforeUnmount: () => {
    console.log('销毁前')
  },
  afterUnmount: () => {
    console.log('销毁后')
  },
}

registerMicroApps(apps, lifeCycles)
start({ prefetch: false, strictStyleIsolation: true })

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
