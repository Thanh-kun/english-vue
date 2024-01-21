<script setup lang="ts">
defineProps({
  imageUrl: String
})
</script>
<template>
  <div
    class="shadow border rounded-3xl text-black no-underline group/card bg-white transition-shadow duration-300 hover:text-black hover:shadow-md"
  >
    <div class="h-48 overflow-hidden rounded-t-3xl">
      <img
        :src="imageUrl"
        class="h-48 w-full object-cover rounded-t-3xl transition-all duration-300 group-hover/card:scale-110"
        loading="lazy"
      />
    </div>
    <div class="p-4">
      <h3 class="text-xl font-bold">
        <slot name="title" />
      </h3>
      <h4 class="text-lg font-bold mb-2">
        <slot name="subTitle" />
      </h4>
      <p class="line-clamp-4">
        <slot name="description" />
      </p>
    </div>
  </div>
</template>
