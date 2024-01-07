<script setup>
import { computed, h, inject } from 'vue'
import { SubItem2 } from '@/components'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  selectedItems: {
    type: Array
  },
  items: {
    type: Array,
    default: () => []
  }
})

const injectSelectedItems = inject('selectedItems2', [])
const selectedKeys = computed(() => props.selectedItems ?? injectSelectedItems)
</script>
<template>
  <ul>
    <li v-for="item of items" :key="item.key" @click="item?.onClick">
      <component
        :is="
          h(SubItem2, { active: selectedKeys.includes(item.key) }, { default: () => item.label })
        "
      />
    </li>
  </ul>
</template>
