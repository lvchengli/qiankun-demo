module.exports = {
  title: "微前端",
  description: 'QIANKUN',
  base: '/',
  // lang: 'en-US', //语言
  repo: 'vuejs/vitepress',
  head: [
    // 改变title的图标
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.ico',//图片放在public文件夹下
      },
    ],
  ],
  // 主题配置
  themeConfig: {
    //   头部导航
    nav: [
      { text: '首页', link: '/' },
      { text: '关于', link: '/about/' },
    ],
    //   侧边导航
    // sidebar: [
    //   { text: 'QIANKUN', link: '/qiankun/', collapasble: false, sidebarDepth: 1 },
    // ],
    sidebar: {
      // '/qiankun/': getQiankunSidebar(),
      '/': getmicroFrontends(),
    }
  }
}

function getQiankunSidebar() {
  return [
    {
      text: 'QIANKUN',
      children: [
        {text: '主应用', link: '/qiankun/root'}
      ]
    }
  ]
}

function getmicroFrontends() {
  return [
    {
      text: '微前端',
      children: [
        { text: '什么是微前端？', link: '/microFrontends/what' },
        { text: '为什么使用微前端？', link: '/microFrontends/why' },
        { text: '怎么样实现微前端？', link: '/microFrontends/how' }
      ]
    },
    {
      text: 'QIANKUN',
      children: [
        {text: 'qiankun', link: '/qiankun/what'},
        {text: '项目搭建', link: '/qiankun/root'}
      ]
    }
  ]
}