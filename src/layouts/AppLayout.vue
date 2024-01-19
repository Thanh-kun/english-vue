<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ConfigProvider, StyleProvider } from 'ant-design-vue'
import { themeConfig } from '@/constant/theme'

const route = useRoute()
const layout = computed(() => {
  return route.meta?.layout ?? 'DefaultLayout'
})
</script>
<template>
  <ConfigProvider :theme="themeConfig">
    <StyleProvider hashPriority="high">
      <component :is="layout">
        <slot />
      </component>
    </StyleProvider>
  </ConfigProvider>
</template>
