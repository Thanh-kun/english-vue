<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  expanded: Boolean
})
</script>
<template>
  <div class="toggle-menu" :class="{ active: expanded }">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>
