import { LogoutOutlined } from '@ant-design/icons-vue'
import { computed, h, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { usePart, useUser } from '@/stores'

export default function useMenu() {
  const route = useRoute()
  const router = useRouter()
  const partStore = usePart()
  const userStore = useUser()

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
    [listeningRoutes, readingRoutes, userStore],
    () => {
      let items = []

      items = [
        {
          label: h(RouterLink, { to: '/' }, { default: () => 'Home' }),
          key: '/'
        },
        {
          label: 'Listen',
          key: '/listen',
          children: listeningRoutes
        },
        {
          label: 'Read',
          key: '/read',
          children: readingRoutes
        },
        {
          label: 'Test',
          key: '/test',
          children: [
            {
              label: h(RouterLink, { to: '/admin' }, { default: () => 'Mini Test' }),
              key: '/test/mini-test'
            },
            {
              label: h(RouterLink, { to: '/admin' }, { default: () => 'Full Test' }),
              key: '/test/full-test'
            }
          ]
        }
      ]

      if (!userStore.isAuth) {
        items = [
          {
            label: h(RouterLink, { to: '/sign-in' }, { default: () => 'Sign in' }),
            key: '/sign-in'
          },
          {
            label: h(RouterLink, { to: '/sign-up' }, { default: () => 'Sign up' }),
            key: '/sign-up'
          },
          ...items
        ]
      } else {
        items = [
          ...items,
          {
            label: h(
              'div',
              { class: 'flex items-center' },
              {
                default: () => [
                  h(LogoutOutlined, { class: 'w-4 h-4 mr-2' }),
                  h('div', null, 'Log out')
                ]
              }
            ),
            key: Symbol('logout'),
            onClick: () => {
              userStore.clearToken()
              router.push('/sign-in')
            }
          }
        ]
      }

      menuItems.value = items
    },
    { immediate: true }
  )

  return {
    menuItems,
    selectedItems
  }
}
