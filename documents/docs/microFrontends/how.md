### 怎么样实现微前端？

- 2018 年 Single-SPA 诞生了， 用于前端微服务化的 JavaScript 前端解决方案, 实现了路由劫持和应用加载, 但本身没有处理样式隔离，js 执行隔离

- 2019 年 qiankun 基于 Single-SPA, 提供了更加开箱即用的 API （single-spa + sandbox + import-html-entry）接入简单。

- 2020 年 webpack5 联邦模块

#### 这是不是 iframe？

- 如果是 iframe，那么切换路由，用户刷新页面，就 gg 了
- dom 结构也无法共享
- 每次都是相当于重新进入浏览器，加载资源慢
