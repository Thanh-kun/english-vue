<script setup>
import AppLayout from './layouts/AppLayout.vue'
</script>
<template>
  <Suspense>
    <AppLayout>
      <RouterView />
    </AppLayout>
  </Suspense>
</template>
