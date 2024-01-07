import { computed, h } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

export default function useMenu() {
  const route = useRoute()

  const selectedItems = computed(() => {
    return menuItems.filter((item) => route.path === item.key).map((item) => item.key)
  })

  const menuItems = [
    {
      label: h(RouterLink, { to: '/' }, { default: () => 'Home' }),
      key: '/'
    },
    {
      label: 'Listen',
      key: '/listen',
      children: [
        {
          label: h(RouterLink, { to: '/admin' }, { default: () => 'Part 1: Photographs' }),
          key: '/listen/photographs'
        },
        {
          label: h(RouterLink, { to: '/admin' }, { default: () => 'Part 2: Question-Response' }),
          key: '/listen/question-response'
        },
        {
          label: h(RouterLink, { to: '/admin' }, { default: () => 'Part 3: Conversations' }),
          key: '/listen/conversations'
        },
        {
          label: h(RouterLink, { to: '/admin' }, { default: () => 'Part 4: Talks' }),
          key: '/listen/talks'
        }
      ]
    },
    {
      label: 'Read',
      key: '/read',
      children: [
        {
          label: h(RouterLink, { to: '/admin' }, { default: () => 'Part 5: Incomplete Sentences' }),
          key: '/listen/photographs'
        },
        {
          label: h(RouterLink, { to: '/admin' }, { default: () => 'Part 6: Text Completion' }),
          key: '/listen/question-response'
        },
        {
          label: h(RouterLink, { to: '/admin' }, { default: () => 'Part 7: Passages' }),
          key: '/listen/conversations'
        }
      ]
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

  return {
    menuItems,
    selectedItems
  }
}
