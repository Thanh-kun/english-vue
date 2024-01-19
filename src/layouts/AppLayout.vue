<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ConfigProvider, StyleProvider } from 'ant-design-vue'
import { themeConfig } from '@/constant/theme'
import { notification } from 'ant-design-vue'
import { usePart } from '@/stores/part'

const route = useRoute()
const partStore = usePart()

const layout = computed(() => {
  return route.meta?.layout ?? 'DefaultLayout'
})

try {
  await partStore.getPartsFromServer()
} catch (err) {
  notification.error({
    message: 'An error occurred, please try again!',
    description: err?.message
  })
}
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
