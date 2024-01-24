import { h, computed } from 'vue'
import { useRoute, RouterLink, useRouter } from 'vue-router'
import {
  UserOutlined,
  ContainerOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
  // AppstoreOutlined,
  LoginOutlined,
  FileDoneOutlined,
  LinkOutlined
} from '@ant-design/icons-vue'
import { useUser, useTheme } from '@/stores'
import { Modal } from 'ant-design-vue'

export default function useSidebar() {
  const router = useRouter()
  const route = useRoute()
  const themeStore = useTheme()
  const userStore = useUser();

  const menuItems = [
    // {
    //   label: h(RouterLink, { to: '/admin' }, { default: () => 'Dashboard' }),
    //   key: '/admin',
    //   icon: h(AppstoreOutlined)
    // },
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
      label: h(RouterLink, { to: '/admin/test' }, { default: () => 'Test' }),
      key: '/admin/test',
      icon: h(FileDoneOutlined)
    },
    {
      label: h(RouterLink, { to: '/admin/test-question' }, { default: () => 'Test - Question' }),
      key: '/admin/test-question',
      icon: h(LinkOutlined)
    },
    {
      label: 'Log out',
      key: 'logout',
      icon: h(LoginOutlined),
      onclick: () => {
        Modal.confirm({
          title: 'Are you sure you want to log out?',
          onOk: () => {
            userStore.clearToken();
            router.push('/sign-in');
          }
        })
      }
    }
  ]

  const selectedKeys = computed(() => {
    return menuItems.filter((item) => route.path === item.key || route.path.startsWith(item.key + '/')).map((item) => item.key)
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
