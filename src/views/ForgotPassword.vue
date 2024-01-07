<script setup>
import { onMounted, reactive } from 'vue'
import { Form, FormItem, Input, Button } from 'ant-design-vue'
import Swal from 'sweetalert2'
const formData = reactive({
  email: ''
})

const rules = {
  email: [
    { required: true, message: 'Please input your email!' },
    {
      pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      message: 'Invalid email address'
    }
  ]
}

const handleSubmit = () => {
  console.log('submit', formData)
  Swal.fire({
    title: 'The email has been sent!',
    text: 'Please check your inbox',
    icon: 'success'
  })
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
        <h1 class="text-2xl font-bold text-center">Forgot Password</h1>
        <Form
          layout="vertical"
          class="mb-5"
          autocomplete="off"
          :rules="rules"
          :model="formData"
          @finish="handleSubmit"
        >
          <FormItem label="Email: " name="email">
            <Input v-model:value="formData.email" autocomplete="email" />
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
