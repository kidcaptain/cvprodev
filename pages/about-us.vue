<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>
    <p>yo</p>
    <h1>Contact!</h1>
    <p>Current route: {{ route.path }}</p>
    <a href="https://nuxt.com/docs/getting-started/routing" target="_blank">Learn more about Nuxt Routing</a>
  </div>
</template>
