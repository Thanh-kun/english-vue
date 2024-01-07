<script setup>
import { SubMenu } from '@/components'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  children: {
    type: Array,
    default: () => []
  }
})
</script>
<template>
  <div class="group/list relative my-1">
    <div
      class="flex items-center group/item no-underline text-sm uppercase font-medium py-4 px-2 rounded-md cursor-pointer transition-all duration-300"
      :class="{
        'bg-primary-400 text-white': active,
        'text-gray-800 hover:text-primary-700': !active
      }"
    >
      <div class="menu-item tracking-widest">
        <slot />
      </div>
      <div
        class="group-hover/item:-rotate-180 transition-all duration-300"
        v-if="children?.length > 0"
      >
        <ChevronDownIcon class="w-4 h-4" />
      </div>
    </div>
    <div
      v-if="children?.length > 0"
      class="absolute top-full right-0 py-2 z-40 invisible transition-all duration-150 opacity-0 group-hover/list:opacity-100 group-hover/list:visible"
    >
      <div class="py-2 px-3 shadow bg-white rounded min-w-40 max-w-52 w-full">
        <SubMenu :items="children" />
      </div>
    </div>
  </div>
</template>
