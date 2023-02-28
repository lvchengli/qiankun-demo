<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1 @click="jumpToHome">jump to home</h1>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  methods: {
    jumpToHome() {
      this.$router.push('/')
    }
  }
}
</script>
