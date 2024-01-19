<script setup>
import PartItem from './PartItem.vue'
defineProps({
  parts: Array
})
</script>
<template>
  <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <RouterLink
      v-for="part of parts"
      :key="part?.id"
      :to="'listening/' + part?.id"
      class="block no-underline"
    >
      <PartItem :imageUrl="part?.thumbnail">
        <template #title>
          {{ part?.sub_name }}
        </template>
        <template #subTitle>
          {{ part?.name }}
        </template>
        <template #description>
          <span :title="part.description">{{ part.description }}</span>
        </template>
      </PartItem>
    </RouterLink>
  </div>
</template>
