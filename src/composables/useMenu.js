import { ref, watch, h, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { usePart } from '@/stores/part'

export default function useMenu() {
  const route = useRoute()
  const partStore = usePart()

  const listeningRoutes = computed(() => {
    return partStore.listeningParts.map((item) => ({
      label: h(
        RouterLink,
        { to: '/part/' + item.id },
        { default: () => `${item.sub_name}: ${item.name}` }
      ),
      key: '/part/' + item.id
    }))
  })

  const readingRoutes = computed(() => {
    return partStore.readingParts.map((item) => ({
      label: h(
        RouterLink,
        { to: '/part/' + item.id },
        { default: () => `${item.sub_name}: ${item.name}` }
      ),
      key: '/part/' + item.id
    }))
  })

  const menuItems = ref([])

  const selectedItems = computed(() => {
    return menuItems.value.filter((item) => route.path === item.key).map((item) => item.key)
  })

  watch(
    [listeningRoutes, readingRoutes],
    () => {
      menuItems.value = [
        {
          label: h(RouterLink, { to: '/' }, { default: () => 'Home' }),
          key: '/'
        },
        {
          label: h(RouterLink, { to: '/listening' }, { default: () => 'Listen' }),
          key: '/listening',
          children: listeningRoutes.value
        },
        {
          label: h(RouterLink, { to: '/reading' }, { default: () => 'Read' }),
          key: '/reading',
          children: readingRoutes.value
        },
        {
          label: h(RouterLink, { to: '/test' }, { default: () => 'Test' }),
          key: '/test',
          children: [
            {
              label: h(RouterLink, { to: '/mini-test' }, { default: () => 'Mini Test' }),
              key: '/mini-test'
            },
            {
              label: h(RouterLink, { to: '/full-test' }, { default: () => 'Full Test' }),
              key: '/full-test'
            }
          ]
        }
      ]
    },
    { immediate: true }
  )

  return {
    menuItems,
    selectedItems
  }
}
