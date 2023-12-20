<script setup>
import { ConfigProvider, StyleProvider } from 'ant-design-vue'
</script>
<template>
  <ConfigProvider
    :theme="{
      token: {
        colorPrimary: '#3b82f6',
        borderRadius: 6
      }
    }"
  >
    <StyleProvider hashPriority="high">
      <slot />
    </StyleProvider>
  </ConfigProvider>
</template>
