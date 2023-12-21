<script setup>
import { Layout, LayoutSider, LayoutContent, Menu } from 'ant-design-vue'
import { useSidebar } from '@/composables'
// import LogoFrame from '@/components/Logo/LogoFrame.vue'
import LogoText from '@/components/Logo/LogoText.vue'

const { menuItems, selectedKeys } = useSidebar()
</script>
<template>
  <div>
    <Layout style="min-height: 100vh">
      <LayoutSider width="256" theme="light" class="border-r">
        <div class="pt-8 pb-10 px-2">
          <div class="h-14 w-full rounded-md overflow-hidden">
            <LogoText class="w-full" style="color: #003366;"/>
          </div>
        </div>
        <Menu
          :selectedKeys="selectedKeys"
          :items="menuItems"
          mode="inline"
          class="!border-r-0"
        ></Menu>
      </LayoutSider>
      <LayoutContent>
        <div class="min-h-screen bg-primary-50 bg-opacity-80 px-4 py-2">
          <div
            class="bg-white py-4 pl-4 rounded-md shadow scroll-custom scroll-custom--hover overflow-y-scroll"
            style="height: calc(100vh - 16px)"
          >
            <div class="min-h-[200vh]">
              <slot />
            </div>
          </div>
        </div>
      </LayoutContent>
    </Layout>
  </div>
</template>
