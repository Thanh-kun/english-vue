<script setup>
import { provide, h } from 'vue'
import { MenuItem2 } from '@/components'

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

provide('selectedItems2', props.selectedItems)
</script>
<template>
  <nav>
    <ul class="px-4">
      <li class="select-none" v-for="item of items" :key="item.key">
        <component
          :is="
            h(
              MenuItem2,
              {
                active: selectedItems.includes(item.key),
                children: item?.children,
                onclick: item?.onClick
              },
              { default: () => item.label }
            )
          "
        />
      </li>
    </ul>
  </nav>
</template>
