<script setup>
import { authApi } from '@/services'
import { useUser } from '@/stores'
import { Form, FormItem, Input, Button, DatePicker, notification } from 'ant-design-vue'
import dayjs from 'dayjs'
import { reactive, ref } from 'vue'

const userStore = useUser()

const userFormData = reactive({
  username: userStore.userInfo.username,
  fullname: userStore.userInfo.fullname,
  birthday: dayjs(userStore.userInfo.birthday),
  telphone: userStore.userInfo.tel
})
const loading = ref(false)

// Validate Form
const rules = {
  username: [{ required: true, message: 'Please input your username!' }],
  fullname: [{ required: true, message: 'Please input your name!' }],
  telphone: [
    {
      pattern: /^[0-9\-\\+]{9,15}$/,
      message: 'Invalid phone number'
    }
  ]
}

const handleSubmit = async () => {
  try {
    loading.value = true
    let data = {
      fullname: userFormData.fullname,
      birthday: userFormData.birthday
        ? dayjs(userFormData.birthday).format('YYYY-MM-DD HH:MM:ss')
        : null,
      tel: userFormData.telphone
    }
    let response = await authApi.updateUser(data)
    if (response.data && response.data.success === true) {
      notification.success({
        message: 'User information has been updated! 🎉'
      })
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
</script>
<template>
  <div style="min-height: calc(100dvh - 60px)" class="bg-primary-50 py-10">
    <div class="w-full container mx-auto">
      <div class="bg-white p-8 rounded-3xl mb-6">
        <h1 class="text-2xl text-center mb-8">User Info</h1>
        <div>
          <Form layout="vertical" :rules="rules" @finish="handleSubmit" :model="userFormData">
            <FormItem label="Username:" name="username">
              <Input v-model:value="userFormData.username" readonly />
            </FormItem>
            <FormItem label="Fullname:" name="fullname">
              <Input v-model:value="userFormData.fullname" />
            </FormItem>
            <FormItem label="Birthday:" name="birthday">
              <DatePicker v-model:value="userFormData.birthday" />
            </FormItem>
            <FormItem label="Tel:" name="telphone">
              <Input v-model:value="userFormData.telphone" />
            </FormItem>
            <FormItem>
              <div class="text-end">
                <Button type="primary" html-type="submit">Submit</Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>
