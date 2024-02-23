<script setup>
import { Button } from 'ant-design-vue'
</script>
<template>
  <div style="min-height: calc(100dvh - 60px)" class="bg-primary-50 py-10">
    <div class="w-full container mx-auto">
      <div class="bg-white p-8 rounded-3xl mb-6">
        <img src="@/assets/images/404.svg" class="w-fit mx-auto" />
        <div class="my-10 text-center">
          <RouterLink to="/">
            <Button type="primary">Go Home</Button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
