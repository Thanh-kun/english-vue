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
  noneSelected: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['change', 'select'])

const handleClick = (item) => {
  emits('change', item.value)
  emits('select', item.value)
}
</script>
<template>
  <div class="flex flex-wrap -mt-2 -mx-1">
    <div class="pt-2 px-1" v-for="item of items" :key="item.value">
      <QuestionItem
        :isSuccess="item.isSuccess"
        :isFailure="item.isFailure"
        :active="item.value === selectedItem"
        :noneSelected="noneSelected"
        @click="() => handleClick(item)"
      >
        {{ item.label }}
      </QuestionItem>
    </div>
  </div>
</template>
