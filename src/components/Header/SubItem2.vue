<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  active: Boolean
})
</script>
<template>
  <div
    class="relative submenu-item block py-2 pl-8 pr-4 rounded-md no-underline cursor-pointer"
    :class="{
      'bg-primary-400 text-white': active,
      'text-black hover:text-white hover:bg-primary-400': !active
    }"
  >
    <slot />
  </div>
</template>
