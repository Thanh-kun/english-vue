<script setup></script>
<template>
  <div
    class="relative top-0.5 w-fit py-2 px-8 rounded-t-xl bg-white border border-b-transparent text-base font-bold tracking-wider"
  >
    <slot name="header" />
  </div>
  <div class="bg-white rounded-b-3xl rounded-r-3xl border">
    <div class="py-8 px-6">
      <div class="max-h-80 overflow-y-scroll overflow-x-hidden scroll-custom p-2">
        <slot name="body" />
      </div>
    </div>
    <div class="border-t px-8 py-4">
      <slot name="footer" />
    </div>
  </div>
</template>
