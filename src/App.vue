<script setup>
import AppLayout from './layouts/AppLayout.vue'
</script>
<template>
  <Suspense>
    <AppLayout>
      <RouterView :key="$route.fullPath" />
    </AppLayout>
  </Suspense>
</template>
