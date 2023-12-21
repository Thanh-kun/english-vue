import { h, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import {
  UserOutlined,
  ContainerOutlined,
  FileTextOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons-vue'

export default function useSidebar() {
  const route = useRoute()
  const menuItems = [
    {
      label: h(RouterLink, { to: '/admin/user' }, { default: () => 'User' }),
      key: '/admin/user',
      icon: h(UserOutlined)
    },
    {
      label: h(RouterLink, { to: '/admin/part' }, { default: () => 'Part' }),
      key: '/admin/part',
      icon: h(ContainerOutlined)
    },
    {
      label: h(RouterLink, { to: '/admin/lesson' }, { default: () => 'Lesson' }),
      key: '/admin/lesson',
      icon: h(FileTextOutlined)
    },
    {
      label: h(RouterLink, { to: '/admin/question' }, { default: () => 'Question' }),
      key: '/admin/question',
      icon: h(QuestionCircleOutlined)
    }
  ]

  const selectedKeys = computed(() => {
    return menuItems.filter((item) => route.path.startsWith(item.key)).map((item) => item.key)
  })

  return {
    selectedKeys,
    menuItems
  }
}
