import { createRouter, createWebHistory } from 'vue-router'
import { useUser } from '@/stores'
import { authApi } from '@/services'

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
      component: () => import('@/views/SignIn.vue'),
      meta: {
        isProtect: true
      }
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: () => import('@/views/SignUp.vue'),
      meta: {
        isProtect: true
      }
    },
    {
      path: '/forgot-password',
      name: 'forgotPassword',
      component: () => import('@/views/ForgotPassword.vue'),
      meta: {
        isProtect: true
      }
    },
    {
      path: '/reset-password',
      name: 'resetPassword',
      component: () => import('@/views/ResetPassword.vue'),
      meta: {
        isProtect: true
      }
    },
    {
      path: '/listening',
      name: 'listening',
      component: () => import('@/views/Listening/index.vue')
    },
    {
      path: '/reading',
      name: 'reading',
      component: () => import('@/views/Reading/index.vue')
    },
    {
      path: '/part/:partId',
      name: 'part',
      component: () => import('@/views/Part/index.vue')
    },
    {
      path: '/part/:partId/:testId',
      name: 'partTest',
      component: () => import('@/views/Part/test.vue'),
      meta: {
        layout: 'LessonLayout'
      }
    },
    {
      path: '/lesson/:partId/:lessonId',
      name: 'lesson',
      component: () => import('@/views/Lesson/id.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/Test/index.vue')
    },
    {
      path: '/mini-test',
      name: 'miniTest',
      component: () => import('@/views/MiniTest/index.vue')
    },
    {
      path: '/mini-test/:partId',
      name: 'miniTestPart',
      component: () => import('@/views/MiniTest/id.vue'),
      meta: {
        layout: 'LessonLayout'
      }
    },
    {
      path: '/full-test',
      name: 'fullTest',
      component: () => import('@/views/FullTest.vue'),
      meta: {
        layout: 'LessonLayout'
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/Dashboard.vue'),
      meta: {
        layout: 'DashboardLayout',
        isAdmin: true
      }
    },
    {
      path: '/admin/user',
      name: 'adminUser',
      component: () => import('@/views/admin/User.vue'),
      meta: {
        layout: 'DashboardLayout',
        isAdmin: true
      }
    },
    {
      path: '/admin/part',
      name: 'adminPart',
      component: () => import('@/views/admin/Part.vue'),
      meta: {
        layout: 'DashboardLayout',
        isAdmin: true
      }
    },
    {
      path: '/admin/lesson',
      name: 'adminLesson',
      component: () => import('@/views/admin/Lesson.vue'),
      meta: {
        layout: 'DashboardLayout',
        isAdmin: true
      }
    },
    {
      path: '/admin/question',
      name: 'adminQuestion',
      component: () => import('@/views/admin/Question/Search.vue'),
      meta: {
        layout: 'DashboardLayout',
        isAdmin: true
      }
    }
  ]
})

router.beforeEach(async (to, before, next) => {
  const userStore = useUser()

  if (to.meta.isAuth || to.meta.isAdmin) {
    if (userStore.accessToken) {
      try {
        let response = await authApi.getUser()
        if (response.status === 200 && response.data.data) {
          userStore.setUserInfo(response.data?.data)
          if (to.meta.isAdmin) {
            if (userStore.userInfo.role === 'admin') {
              return next()
            }
            userStore.clearToken()
            return next('/')
          }
          return next()
        }
        throw new Error()
      } catch (err) {
        console.log(err)
      }
    } else {
      userStore.clearToken()
      return next('/')
    }
  }

  if (to.meta.isProtect && userStore.accessToken) {
    userStore.clearToken()
    return next('/')
  }

  next()
})

export default router
