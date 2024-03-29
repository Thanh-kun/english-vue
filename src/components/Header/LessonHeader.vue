<script setup>
import { computed, ref } from 'vue'
import { LogoText, MenuButton, Menu2 } from '@/components'
import { useMenuMobile } from '@/composables'
import { RouterLink } from 'vue-router'
import { useUser } from '@/stores'

const isUnfold = ref(false)

const { menuItems: menuMobileItems, selectedItems: selectedMobileItems } = useMenuMobile()
const userStore = useUser()

const firstLetter = computed(() => {
  return userStore?.userInfo?.username ? userStore?.userInfo?.username.toString().slice(0, 1) : ''
})

const handleToggleMenu = () => {
  isUnfold.value = !isUnfold.value
}
const handleCloseMenu = () => {
  isUnfold.value = false
}
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
          <div class="ml-auto">
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
                  <Menu2
                    :items="menuMobileItems"
                    :selectedItems="selectedMobileItems"
                    @close="handleCloseMenu"
                  />
                </div>
                <div class="absolute bottom-4 left-4 right-24" v-if="userStore.userInfo?.username">
                  <RouterLink to="/" class="no-underline text-black hover:text-gray-800">
                    <div class="flex gap-2 items-center w-full">
                      <div
                        class="flex-shrink-0 flex items-center justify-center text-white w-12 h-12 bg-primary-300 rounded-full overflow-x-hidden"
                      >
                        <span> {{ firstLetter }} </span>
                      </div>
                      <div class="flex-1">
                        <div class="w-full overflow-hidden">
                          <div class="text-sm font-bold overflow-hidden break-all line-clamp-1">
                            {{ userStore.userInfo?.fullname }}
                          </div>
                          <div class="text-sm font-light overflow-hidden break-all line-clamp-1">
                            {{ userStore.userInfo?.username }}
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
