<script setup>
import { computed, reactive, onMounted } from 'vue'
import { Form, FormItem, Input, Button } from 'ant-design-vue'

const formData = reactive({
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
            <Button htmlType="submit" block type="primary">Submit</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
