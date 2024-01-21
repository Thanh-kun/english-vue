<script setup>
import { onMounted, reactive, ref } from 'vue'
import { Form, FormItem, Input, Button, notification } from 'ant-design-vue'
import Swal from 'sweetalert2'
import { authApi } from '@/services'

const formData = reactive({
  email: ''
})
const formRef = ref(null)
const loading = ref(false)

const rules = {
  email: [
    { required: true, message: 'Please input your email!' },
    {
      pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      message: 'Invalid email address'
    }
  ]
}

const handleSubmit = async () => {
  try {
    loading.value = true
    let data = {
      email: formData.email
    }
    let response = await authApi.formatPassword(data)
    if (response.data && response.data.success === true && response.data.data) {
      Swal.fire({
        title: 'The email has been sent!',
        text: 'Please check your inbox',
        icon: 'success'
      })
      formRef.value.resetFields()
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
      <div class="max-w-lg w-full bg-white rounded-3xl p-8 shadow-md border">
        <h1 class="text-2xl font-bold text-center">Forgot Password</h1>
        <Form
          layout="vertical"
          class="mb-5"
          autocomplete="off"
          :rules="rules"
          :model="formData"
          ref="formRef"
          @finish="handleSubmit"
        >
          <FormItem label="Email: " name="email">
            <Input v-model:value="formData.email" autocomplete="email" />
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
