<script setup>
import { onMounted, reactive } from 'vue'
import { Form, FormItem, Input, Button } from 'ant-design-vue'

const formData = reactive({
  username: '',
  password: ''
})

const rules = {
  username: [{ required: true, message: 'Please input your username!' }],
  password: [
    {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      message:
        'The password must be at least eight characters long, containing at least one letter and one number'
    },
    { required: true, message: 'Please input your password!' }
  ]
}

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
      <div class="max-w-lg w-full bg-white rounded-md py-8 px-4 shadow-md border">
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
            <Button htmlType="submit" block type="primary">Submit</Button>
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
