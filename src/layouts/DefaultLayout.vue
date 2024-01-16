<script setup>
import { Footer, Header } from '@/components'
</script>
<template>
  <div>
    <Header />
    <div style="min-height: calc(100vh - 60px)">
      <slot />
    </div>
    <Footer />
  </div>
</template>
