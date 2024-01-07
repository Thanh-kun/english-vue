<script setup>
import { Footer, Header } from '@/components'
</script>
<template>
  <div>
    <Header />
    <div>
      <slot />
    </div>
    <Footer />
  </div>
</template>
