import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
]

const router = new VueRouter({
  base: '',
  mode: 'history',
  routes,
});
// 目前一种尝试的解决方案
function getPathStr(str) {
  if (str.startsWith('/vue3')) {
    return str.replace('/vue3', '')
  } 
  return str
}

router.afterEach((to, from, next) => {
  console.log(to.fullPath, 'router.afterEach')
  const state = {
    ...history.state,
    current: getPathStr(to.fullPath)
  }
  history.replaceState(state, '', window.location.href)
})

export default router
