<script setup>
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { SubMenu2 } from '@/components'
import { ref, watch } from 'vue'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  expansed: {
    type: Boolean,
    default: false
  },
  children: {
    type: Array,
    default: () => []
  }
})

const expansedMenu = ref(props.expansed)
const emits = defineEmits(['click', 'close'])

const handleClick = function (e) {
  expansedMenu.value = !expansedMenu.value
  emits('click', e)
  if(props?.children === null || props?.children === undefined || props?.children?.length <= 0) emits('close', e);
}

const handleClose = (e) => {
  emits('close', e)
}

watch(
  () => props.expansed,
  (newValue) => {
    expansedMenu.value = newValue
  }
)
</script>
<template>
  <div @click="handleClick">
    <div
      class="relative menu-item flex items-center justify-between py-2 px-4 rounded-md no-underline cursor-pointer"
      :class="{
        'text-black hover:text-white hover:bg-primary-400': !active,
        'text-white bg-primary-400': active
      }"
    >
      <div>
        <slot />
      </div>
      <span v-if="children.length > 0">
        <ChevronDownIcon
          class="w-4 h-4 transition-transform duration-300"
          :class="{ '-rotate-180': expansedMenu }"
        />
      </span>
    </div>
    <div
      class="transition-all duration-500 overflow-hidden"
      :class="{ 'max-h-0': !expansedMenu, 'max-h-96': expansedMenu }"
      v-if="children.length > 0"
    >
      <SubMenu2 :items="children" @close="handleClose"/>
    </div>
  </div>
</template>
