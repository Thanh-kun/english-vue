<script setup>
import { SubItem } from '@/components'
import { computed, h, inject } from 'vue'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  selectedItems: {
    type: Array
  },
  items: {
    type: Array,
    default() {
      return []
    }
  }
})

const injectSelectedItems = inject('selectedItems', [])
const selectedKeys = computed(() => props.selectedItems ?? injectSelectedItems)
</script>
<template>
  <ul>
    <li
      class="text-nowrap mb-0.5 select-none"
      v-for="item of items"
      :key="JSON.stringify(item.key)"
    >
      <component
        :is="
          h(SubItem, { active: selectedKeys?.includes(item.key) }, { default: () => item.label })
        "
      >
      </component>
    </li>
  </ul>
</template>
