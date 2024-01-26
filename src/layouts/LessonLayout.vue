<script setup>
import { LessonHeader } from '@/components'
</script>
<template>
  <div>
    <LessonHeader />
    <div style="min-height: calc(100vh - 60px)">
      <slot />
    </div>
  </div>
</template>
