<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
  <div
    class="submenu-item relative block p-2 rounded-md overflow-hidden text-ellipsis cursor-pointer"
    :class="{
      'text-gray-800 hover:bg-primary-400 hover:text-white': !active,
      'bg-primary-400 text-white': active
    }"
  >
    <slot />
  </div>
</template>
