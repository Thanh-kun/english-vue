<script setup>
import QuestionItem from './QuestionItem.vue'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  selectedItem: {
    type: [String, Number],
    default: 1
  },
  listAnswer: {
    type: Object,
    default: () => {}
  },
})

const emits = defineEmits(['change'])

const handleClick = (item) => {
  emits('change', item.value)
}
</script>
<template>
  <div class="flex flex-wrap -mt-2 -mx-1">
    <div class="pt-2 px-1" v-for="item of items" :key="item.value">
      <QuestionItem :isSelected="listAnswer?.[item.id] >= 1" :active="item.value === selectedItem" @click="() => handleClick(item)">
        {{ item.label }}
      </QuestionItem>
    </div>
  </div>
</template>
