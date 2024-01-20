<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  active: Boolean
})
</script>
<template>
  <div
    class="p-1 rounded-md whitespace-nowrap text-gray-800 font-semibold text-sm w-9 h-9 text-center leading-7 border cursor-pointer"
    :class="{
      'border-primary-500 bg-primary-300 ring-1 ring-primary-300': active,
      'border-gray-300 bg-primary-100': !active
    }"
  >
    <slot />
  </div>
</template>
