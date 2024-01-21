<script setup>
import { computed, reactive, onMounted, ref } from 'vue'
import { Form, FormItem, Input, Button, notification } from 'ant-design-vue'
import { authApi } from '@/services'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const accessToken = route.query?.access_token

const formData = reactive({
  password: '',
  confirmPassword: ''
})
const loading = ref(false)

const validatePass = async (_rule, value) => {
  if (value === '') {
    return Promise.reject('Please input the password again')
  } else if (value !== formData.password) {
    return Promise.reject("Two inputs don't match!")
  } else {
    return Promise.resolve()
  }
}

const rules = computed(() => ({
  password: [
    {
      pattern: /^.{8,}$/,
      message:
        'The password must be at least eight characters long, containing at least one letter and one number'
    },
    { required: true, message: 'Please input your password!' }
  ],
  confirmPassword: [{ validator: validatePass, message: 'The passwords do not match!' }]
}))

const handleSubmit = async () => {
  try {
    loading.value = true
    let data = {
      password: formData.password
    }

    let response = await authApi.resetPassword(data, {
      headers: { Authorization: 'Bearer ' + accessToken }
    })
    if (response.data && response.data.success === true) {
      notification.success({
        message: 'Your password has been changed!',
        description: response.data?.data
      })
      router.push('/sign-in')
    } else throw new Error(response.data?.message)
  } catch (err) {
    notification.error({
      message: 'An error occurred, please try again!',
      description: err.message
    })
  } finally {
    loading.value = false
  }
}

const checkToken = async () => {
  try {
    let response = await authApi.checkAuth({ headers: { Authorization: 'Bearer ' + accessToken } })
    if (response.data && response.data.success === true) {
      // console.log()
    } else throw new Error(response.data?.message)
  } catch (err) {
    notification.error({
      message: 'Token has expired'
    })
  }
}

await checkToken()

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
      <div class="max-w-lg w-full bg-white rounded-3xl p-8">
        <h1 class="text-2xl font-bold text-center">Reset Password</h1>
        <Form
          layout="vertical"
          class="mb-5"
          autocomplete="off"
          :rules="rules"
          :model="formData"
          @finish="handleSubmit"
        >
          <FormItem label="Password: " name="password">
            <Input type="password" v-model:value="formData.password" autocomplete="new-password" />
          </FormItem>
          <FormItem label="Confirm Password: " name="confirmPassword">
            <Input
              type="password"
              v-model:value="formData.confirmPassword"
              autocomplete="new-password"
            />
          </FormItem>
          <FormItem>
            <Button htmlType="submit" block type="primary" :loading="loading">Submit</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
