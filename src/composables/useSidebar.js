import { h, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import {
  UserOutlined,
  ContainerOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
  AppstoreOutlined,
  LoginOutlined
} from '@ant-design/icons-vue'
import { useTheme } from '@/stores/theme'

export default function useSidebar() {
  const route = useRoute()
  const themeStore = useTheme()

  const menuItems = [
    {
      label: h(RouterLink, { to: '/admin' }, { default: () => 'Dashboard' }),
      key: '/admin',
      icon: h(AppstoreOutlined)
    },
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
    },
    {
      label: 'Log out',
      key: 'logout',
      icon: h(LoginOutlined)
    }
  ]

  const selectedKeys = computed(() => {
    return menuItems.filter((item) => route.path === item.key).map((item) => item.key)
  })

  const collapsed = computed(() => themeStore.collapsedMenu)
  const toggleMenu = () => {
    themeStore.toggleMenu()
  }

  return {
    selectedKeys,
    menuItems,
    collapsed,
    toggleMenu
  }
}
