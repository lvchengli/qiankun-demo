import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import routes from './router'

Vue.config.productionTip = false

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')

let instance = null
let router = null
// 子应用挂载到自己的html中，基座会拿到挂载后的html，将其插入规定的容器中
function render(props = {}) {
  const { container } = props
  const base = window.__POWERED_BY_QIANKUN__ ? '/vue' : ''
  router = new VueRouter({
    base,
    mode: 'history',
    routes,
  });

  router.afterEach((to, from, next) => {
    const state = {
      ...history.state,
      current: base + to.fullPath
    }
    history.replaceState(state, '', window.location.href)
  })

  instance = new Vue({
    router,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

// 如果不在qiankun中，可以单独运行
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}
// qiankun自动注入路径，设置到webpack中
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}

 // 父应用可以传递属性
export async function bootstrap(props) {
  console.log('oak项目启动')
}

export async function mount(props) {
  console.log('oak项目 mount')
  render(props)
}

export async function unmount(props) {
  console.log('oak项目 unmount')
  instance.$destroy()
  instance.$el.innerHTML = '';
  instance = null
  router = null;
}
