<script setup>
import { computed, reactive, onMounted, ref } from 'vue'
import { Form, FormItem, Input, Button, notification } from 'ant-design-vue'
import { authApi } from '@/services'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'

// Reactive
const router = useRouter()
const loading = ref(false)
const formData = reactive({
  fullname: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// Validate Form
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
  fullname: [{ required: true, message: 'Please input your name!' }],
  email: [
    { required: true, message: 'Please input your email!' },
    {
      pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      message: 'Invalid email address'
    }
  ],
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

// Method
const handleSubmit = async () => {
  try {
    loading.value = true
    let data = {
      username: formData.email,
      fullname: formData.fullname,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    }
    let response = await authApi.signUp(data)
    if (response.data && response.data.success === true) {
      notification.success({
        message: 'Registration successful! 🎉',
        description: 'Please log in again!'
      })
      Swal.fire({
        icon: 'success',
        title: 'Registration successful',
        showConfirmButton: false,
        timer: 1000
      })
      router.push('/')
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
      <div class="max-w-lg w-full mx-auto bg-white rounded-3xl p-8">
        <h1 class="text-2xl font-bold text-center">Sign up</h1>
        <Form
          layout="vertical"
          class="mb-5"
          autocomplete="off"
          :rules="rules"
          :model="formData"
          @finish="handleSubmit"
        >
          <FormItem label="Name: " name="fullname">
            <Input v-model:value="formData.fullname" autocomplete="name" />
          </FormItem>
          <FormItem label="Email: " name="email">
            <Input v-model:value="formData.email" autocomplete="email" />
          </FormItem>
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
        <div>
          <span class="mr-2">Do you have an account?</span>
          <RouterLink to="/sign-in" class="no-underline">Login</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
