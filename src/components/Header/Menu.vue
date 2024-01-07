<script setup>
import { MenuItem } from '@/components'
import { h, provide } from 'vue'

const props = defineProps({
  selectedItems: {
    type: Array,
    default: () => []
  },
  items: {
    type: Array,
    default: () => []
  }
})

provide('selectedItems', props.selectedItems)
</script>
<template>
  <nav>
    <ul class="flex gap-1">
      <li class="select-none" v-for="item of items" :key="item.key">
        <component
          :is="
            () =>
              h(
                MenuItem,
                { children: item.children, active: selectedItems.includes(item?.key) },
                { default: () => item.label }
              )
          "
        />
      </li>
    </ul>
  </nav>
</template>
