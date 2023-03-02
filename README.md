# 项目介绍
这个项目是一个 qiankun 简单的demo，主应用是 vue3，子应用有 vue2 和 react。

在 feature/fix 分支中，有 vue3 和 vue2 两个版本的主应用。也有 vue3 和 vue2 两个版本的子应用。通过 router.afterEach 钩子函数解决了 vue-router3 和 vue-router4 在qiankun 下不兼容的问题。

```javascript
// vue2 主应用 + vue3 子应用。在主应用中修改 history，去除子应用的路由前缀
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

// vue3 主应用 + vue2 子应用。在子应用中修改 history，在router路径前增加子应用的路由前缀
const base = window.__POWERED_BY_QIANKUN__ ? '/vue' : ''

router.afterEach((to, from, next) => {
  const state = {
    ...history.state,
    current: base + to.fullPath
  }
  history.replaceState(state, '', window.location.href)
})

```