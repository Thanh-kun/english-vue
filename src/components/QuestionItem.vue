<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  active: Boolean,
  isSuccess: Boolean,
  isFailure: Boolean,
  isDone: Boolean,
  noneSelected: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
  <div
    class="p-1 rounded-md whitespace-nowrap text-gray-800 font-semibold text-sm w-9 h-9 text-center leading-7 border cursor-pointer"
    :class="{
      'border-primary-500 bg-primary-500 text-white ring-1 ring-primary-400 ring-offset-1': active,
      'border-green-500 bg-green-200': !active && isSuccess,
      'border-red-500 bg-red-200': !active && isFailure,
      'border-gray-300 bg-primary-100': !active && !isSuccess && !isFailure && isDone,
      'border-gray-300 bg-gray-200': !active && !isSuccess && !isFailure && !isDone,
      'cursor-pointer': !noneSelected,
      'cursor-not-allowed': noneSelected
    }"
  >
    <slot />
  </div>
</template>
