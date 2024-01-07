<script setup>
import { computed, reactive, onMounted } from 'vue'
import { Form, FormItem, Input, Button } from 'ant-design-vue'

const formData = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

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
  name: [{ required: true, message: 'Please input your name!' }],
  email: [
    { required: true, message: 'Please input your email!' },
    {
      pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      message: 'Invalid email address'
    }
  ],
  password: [
    {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      message:
        'The password must be at least eight characters long, containing at least one letter and one number'
    },
    { required: true, message: 'Please input your password!' }
  ],
  confirmPassword: [
    {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      message:
        'The password must be at least eight characters long, containing at least one letter and one number'
    },
    { validator: validatePass, message: 'The passwords do not match!' }
  ]
}))

const handleSubmit = () => {
  console.log('submit', formData)
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
    <div class="container py-16 h-full flex items-center justify-center">
      <div class="max-w-lg w-full bg-white rounded-md py-8 px-4">
        <h1 class="text-2xl font-bold text-center">Sign up</h1>
        <Form
          layout="vertical"
          class="mb-5"
          autocomplete="off"
          :rules="rules"
          :model="formData"
          @finish="handleSubmit"
        >
          <FormItem label="Name: " name="name">
            <Input v-model:value="formData.name" autocomplete="name" />
          </FormItem>
          <FormItem label="Email: " name="email">
            <Input v-model:value="formData.email" autocomplete="email" />
          </FormItem>
          <FormItem label="Password: " name="password">
            <Input
              type="password"
              v-model:value="formData.password"
              autocomplete="current-password"
            />
          </FormItem>
          <FormItem label="Confirm Password: " name="confirmPassword">
            <Input
              type="password"
              v-model:value="formData.confirmPassword"
              autocomplete="current-password"
            />
          </FormItem>
          <FormItem>
            <Button htmlType="submit" block type="primary">Submit</Button>
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
