# 项目搭建

## 主应用

1、创建基座，这里使用了 vue3 创建的项目为基座

```npm
vue create base
npm install qiankun element-plus -S
```

2、注册应用

基座根据不同的规则，来加载不同的子应用

```js
import { registerMicroApps, start } from "qiankun";
const apps = [
  {
    name: "subapp-vue", // 应用名称
    entry: "//localhost: 10011", // 通过fetch加载html，js并且动态执行，所以子应用必须支持跨域
    container: "#vue", // 容器
    activeRule: "/vue", // 激活条件
  },
  {
    name: "subapp-react",
    entry: "//localhost: 10012", // 通过fetch加载html，js并且动态执行，所以子应用必须支持跨域
    container: "#react", // 容器
    activeRule: "/react", // 激活条件
  },
];

registerMicroApps(apps);
start();
```

## 子应用修改

打包为类库子应用需要导出`bootstrap` `mount` `unmount`三个方法(可以不写内容，但必须暴露)

### 1. vue

```js
// router/index.js
const router = new VueRouter({
  mode: "history",
  base: "/vue",
  routes,
});

// main.js
// 子应用挂载到自己的html中，基座会拿到挂载后的html，将其插入规定的容器中
let instance = null;
function render(props = {}) {
  const { container } = props;
  instance = new Vue({
    router,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector("#app") : "#app");
}

// 如果不在qiankun中，可以单独运行
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}
// qiankun自动注入路径，设置到webpack中
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

// 父应用可以传递属性
export async function bootstrap(props) {
  console.log("oak项目启动");
}

export async function mount(props) {
  console.log("oak项目 mount");
  render(props);
}

export async function unmount(props) {
  console.log("oak项目 unmount");
  instance.$destroy();
  instance = null;
}

// 配置打包
module.exports = {
  devServer: {
    port: 10011,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  configureWebpack: {
    output: {
      library: "subapp-vue",
      libraryTarget: "umd",
    },
  },
};
```

### 2. react

```js
// index.js
function render() {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
}
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {}
export async function mount() {
  render();
}
export async function unmount() {
  ReactDOM.unmountComponentAtNode(document.getElementById("root"));
}

// 配置打包
module.exports = {
  webpack: (config) => {
    config.output.library = `subapp-react`;
    config.output.libraryTarget = "umd";
    config.output.publicPath = "http://localhost:10012/";
    return config;
  },
  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      config.headers = {
        "Access-Control-Allow-Origin": "*",
      };
      return config;
    };
  },
};
```
