<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :router="true"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="/">
        首页
      </el-menu-item>
      <el-menu-item index="/vue">
        vue-app
      </el-menu-item>
      <el-menu-item index="/vue/about">
        vue-app-about
      </el-menu-item>
      <el-menu-item index="/vue3">
        vue3-app
      </el-menu-item>
      <el-menu-item index="/vue3/about">
        vue3-app-about
      </el-menu-item>
      <el-menu-item index="/react">
        react-app
      </el-menu-item>
    </el-menu>

    <router-view/>
    <div id="vue"></div>
    <div id="vue3"></div>
    <div id="react"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '/'
    }
  },
  methods: {
    handleSelect(val) {
      this.activeIndex = val
    }
  }
}
</script>
<style lang="scss">
html, body{
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none;
}
</style>
