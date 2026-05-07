<script setup lang="ts">
import { darkTheme } from 'naive-ui'
</script>

<template>
  <n-config-provider :theme="darkTheme">
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </n-config-provider>
</template>

<style>
  html,
  body,
  #app {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background: #111111;
    color: white;
    font-family:
      Inter,
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      sans-serif;
  }

  * {
    box-sizing: border-box;
  }

</style>