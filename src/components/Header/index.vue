<script setup>
import { ref } from 'vue'
import { Button } from 'ant-design-vue'
import { LogoText, Menu, MenuButton, Menu2 } from '@/components'
import { useMenuMobile, useMenu } from '@/composables'
import { RouterLink } from 'vue-router'

const isUnfold = ref(false)

const handleToggleMenu = () => {
  isUnfold.value = !isUnfold.value
}

const handleCloseMenu = () => {
  isUnfold.value = false
}

const { menuItems, selectedItems } = useMenu()
const { menuItems: menuMobileItems, selectedItems: selectedMobileItems } = useMenuMobile()
</script>
<template>
  <header class="sticky top-0 z-40">
    <div class="bg-white shadow-md z-1 bg-opacity-90">
      <div class="container mx-auto h-[60px]">
        <div class="flex items-center gap-6">
          <RouterLink to="/">
            <div class="h-14 w-fit min-w-24 py-3">
              <LogoText class="w-full h-full" style="color: #003366" />
            </div>
          </RouterLink>
          <div class="items-center gap-4 ml-auto hidden lg:flex">
            <Menu :items="menuItems" :selectedItems="selectedItems" />
            <div class="flex divide-x border-gray-600">
              <div>
                <RouterLink :to="{ name: 'signIn' }">
                  <Button type="link">Sign in</Button>
                </RouterLink>
              </div>
              <div>
                <RouterLink :to="{ name: 'signUp' }">
                  <Button type="link">Sign up</Button>
                </RouterLink>
              </div>
              <RouterLink to="/" class="no-underline text-black hover:text-gray-800">
                <div
                  class="flex-shrink-0 flex items-center justify-center text-white w-10 h-10 bg-primary-300 rounded-full overflow-x-hidden"
                >
                  <span> L </span>
                </div>
              </RouterLink>
            </div>
          </div>
          <div class="ml-auto block lg:hidden">
            <div
              class="relative p-1 shadow border rounded-lg border-gray-200 cursor-pointer z-50 bg-white"
              @click="handleToggleMenu"
            >
              <MenuButton :expanded="isUnfold" />
            </div>
            <div
              class="fixed left-0 top-0 bottom-0 right-0 transition-all duration-300"
              :class="{ 'visible opacity-100': isUnfold, 'invisible opacity-0': !isUnfold }"
            >
              <div
                class="absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-40"
                @click="handleCloseMenu"
              ></div>
              <div
                class="absolute top-0 bottom-0 left-0 w-96 bg-white rounded-br-large border shadow max-w-full pb-36 h-full"
              >
                <div class="h-full overflow-y-auto mb-36 scroll-custom">
                  <RouterLink to="/" class="block py-6">
                    <div class="h-8 max-w-full">
                      <LogoText class="h-full w-full" style="color: #003366" />
                    </div>
                  </RouterLink>
                  <Menu2 :items="menuMobileItems" :selectedItems="selectedMobileItems" />
                </div>
                <div class="absolute bottom-4 left-4 right-24">
                  <RouterLink to="/" class="no-underline text-black hover:text-gray-800">
                    <div class="flex gap-2 items-center w-full">
                      <div
                        class="flex-shrink-0 flex items-center justify-center text-white w-12 h-12 bg-primary-300 rounded-full overflow-x-hidden"
                      >
                        <span> L </span>
                      </div>
                      <div class="flex-1">
                        <div class="w-full overflow-hidden">
                          <div class="text-sm font-bold overflow-hidden break-all line-clamp-1">
                            Example 1
                          </div>
                          <div class="text-sm font-light overflow-hidden break-all line-clamp-1">
                            example1@gmail.com
                          </div>
                        </div>
                      </div>
                    </div>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
