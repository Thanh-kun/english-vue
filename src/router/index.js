import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component: () => import('@/views/SignIn.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/Dashboard.vue'),
      meta: {
        layout: 'DashboardLayout'
      }
    },
    {
      path: '/admin/user',
      name: 'adminUser',
      component: () => import('@/views/admin/User.vue'),
      meta: {
        layout: 'DashboardLayout'
      }
    },
    {
      path: '/admin/part',
      name: 'adminPart',
      component: () => import('@/views/admin/Part.vue'),
      meta: {
        layout: 'DashboardLayout'
      }
    },
    {
      path: '/admin/lesson',
      name: 'adminLesson',
      component: () => import('@/views/admin/Lesson.vue'),
      meta: {
        layout: 'DashboardLayout'
      }
    },
    {
      path: '/admin/question',
      name: 'adminQuestion',
      component: () => import('@/views/admin/Question/Search.vue'),
      meta: {
        layout: 'DashboardLayout'
      }
    }
  ]
})

export default router
