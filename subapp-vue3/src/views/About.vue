<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1 @click="jumpToHome">jump to home</h1>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
// @ is an alias to /src
const router = useRouter()
function jumpToHome() {
  router.push('/')
}
</script>
