<script setup>
import { CheckCircleIcon } from '@heroicons/vue/24/outline'
defineProps({
  isDone: Boolean
})
</script>
<template>
  <div
    class="flex items-center justify-between border shadow py-4 px-4 rounded-md text-black no-underline transition duration-300 bg-white hover:text-primary-500 hover:border-primary-50 hover:bg-primary-50"
  >
    <slot />
    <div v-if="isDone">
      <CheckCircleIcon class="w-5 h-5 text-green-500" />
    </div>
  </div>
</template>
