
import Vue from 'vue'

import App from './App'
import router from './router'

import { registerMicroApps, start } from 'qiankun'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


// set ElementUI lang to EN
Vue.use(ElementUI)
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

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
  },
  {
    name: 'subapp-vue3',
    entry: '//localhost:10013', // 通过fetch加载html，js并且动态执行，所以子应用必须支持跨域
    container: '#vue3', // 容器
    activeRule: '/vue3' // 激活条件
  },
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

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
