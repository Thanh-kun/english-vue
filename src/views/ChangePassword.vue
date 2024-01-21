<script setup>
import { onMounted, reactive, ref } from 'vue'
import { Form, FormItem, Input, Button, notification } from 'ant-design-vue'
import { authApi } from '@/services'

const formData = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const formRef = ref(null)
const loading = ref(false)

const validatePass = async (_rule, value) => {
  if (value === '') {
    return Promise.reject('Please input the password again')
  } else if (value !== formData.newPassword) {
    return Promise.reject("Two inputs don't match!")
  } else {
    return Promise.resolve()
  }
}
const rules = {
  oldPassword: [{ required: true, message: 'Please input your old password!' }],
  newPassword: [
    {
      pattern: /^.{8,}$/,
      message:
        'The password must be at least eight characters long, containing at least one letter and one number'
    },
    { required: true, message: 'Please input your new password!' }
  ],
  confirmPassword: [{ validator: validatePass, message: 'The passwords do not match!' }]
}

const handleSubmit = async () => {
  try {
    loading.value = true
    let data = {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword
    }

    let response = await authApi.changePassword(data)
    if (response.data && response.data.success === true) {
      notification.success({
        message: 'Your password has been changed!',
        description: response.data?.data
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
  <div style="min-height: calc(100dvh - 60px)" class="bg-primary-50 py-10">
    <div class="w-full container mx-auto">
      <div class="bg-white p-8 rounded-3xl mb-6">
        <h1 class="text-2xl text-center mb-8">Change Password</h1>
        <Form
          layout="vertical"
          class="mb-5"
          autocomplete="off"
          :rules="rules"
          :model="formData"
          ref="formRef"
          @finish="handleSubmit"
        >
          <FormItem label="Old Password: " name="oldPassword">
            <Input
              type="password"
              v-model:value="formData.oldPassword"
              autocomplete="current-password"
            />
          </FormItem>
          <FormItem label="New Password: " name="newPassword">
            <Input
              type="password"
              v-model:value="formData.newPassword"
              autocomplete="new-password"
            />
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
