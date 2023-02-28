<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1 @click="jumpToAbout">jump to about</h1>
  </div>
</template>

<script setup>

import { useRouter } from 'vue-router';
// @ is an alias to /src
const router = useRouter()
function jumpToAbout() {
  router.push('/about')
}
</script>

