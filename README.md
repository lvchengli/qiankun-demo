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

# 部署到 github pages

1. 主应用打包至 docs 目录下
2. 子应用打包至 docs 对应的目录下，例如 /vue3 目录
3. 遍历主应用、子应用的路由，创建对应的目录和添加对应的 index.html 文件，来模拟 spa 的效果（TODO）

# 部署前检查代码是否可用

通过 http 和 http-proxy-middleware 创建一个静态资源服务器并且设置请求转发能力，让本地 `/qiankun-demo` 请求映射在 `docs` 目录下，验证页面是否能够正常访问