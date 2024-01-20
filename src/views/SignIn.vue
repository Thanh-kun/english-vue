<script setup>
import { onMounted, reactive, ref } from 'vue'
import { Form, FormItem, Input, Button, notification } from 'ant-design-vue'
import { authApi } from '@/services'
import { useUser } from '@/stores'
import { useRouter } from 'vue-router'

// Reactive
const userStore = useUser()
const router = useRouter()

const loading = ref(false)
const formData = reactive({
  username: '',
  password: ''
})

// Validate Form
const rules = {
  username: [{ required: true, message: 'Please input your username!' }],
  password: [{ required: true, message: 'Please input your password!' }]
}

// Method
const handleSubmit = async () => {
  try {
    loading.value = true
    let data = {
      username: formData.username,
      password: formData.password
    }
    let response = await authApi.signIn(data)
    if (response.data && response.data.success === true && response.data.data?.access_token) {
      userStore.setToken(response.data.data.access_token)
      userStore.setUserInfo(response.data.data)

      notification.success({
        message: 'Login successful! 🎉',
        description: 'Hava a nice day!'
      })
      router.push('/')
    } else throw new Error(response.data?.message)
  } catch (err) {
    notification.error({
      message: 'Login failed, please try again!',
      description: err.message
    })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>
<template>
  <div
    style="min-height: calc(100dvh - 60px)"
    class="bg-gradient-to-br from-primary-200 via-primary-50 to-pink-200"
  >
    <div class="container mx-auto py-16 h-full flex items-center justify-center">
      <div class="max-w-lg w-full bg-white rounded-3xl p-8 shadow-md border">
        <h1 class="text-2xl font-bold text-center">Sign in</h1>
        <Form
          layout="vertical"
          class="mb-5"
          autocomplete="off"
          :rules="rules"
          :model="formData"
          @finish="handleSubmit"
        >
          <FormItem label="Username: " name="username">
            <Input v-model:value="formData.username" autocomplete="username" />
          </FormItem>
          <FormItem label="Password: " name="password">
            <Input
              type="password"
              v-model:value="formData.password"
              autocomplete="current-password"
            />
          </FormItem>
          <div class="flex justify-end mb-4">
            <RouterLink to="/forgot-password" href="#">Forgot password</RouterLink>
          </div>
          <FormItem>
            <Button htmlType="submit" block type="primary" :loading="loading">Submit</Button>
          </FormItem>
        </Form>
        <div>
          <span class="mr-2">Don't have account?</span>
          <RouterLink to="/sign-up" class="no-underline">Register</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
