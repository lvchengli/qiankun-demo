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
    <!-- <router-link to="/vue">vue</router-link> |
      <router-link to="/react">react</router-link> -->
  </div>
  <router-view/>
  <div id="vue"></div>
  <div id="vue3"></div>
  <div id="react"></div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const state = reactive({
      activeIndex: '/'
    })

    const methods = {
      handleSelect(val) {
        state.activeIndex = val
      }
    }

    return {
      ...toRefs(state),
      ...methods
    }
  },
})
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

