<script setup>
import { commonApi } from '@/services'
import { SearchOutlined } from '@ant-design/icons-vue'
import { Button, Form, FormItem, Input, Table, notification } from 'ant-design-vue'
import { computed, reactive, ref } from 'vue'

// Reactive
const users = ref([])
const usersLoading = ref(false)

const searchFormData = reactive({
  username: undefined,
  fullname: undefined
})

const pageSize = ref(10)
const current = ref(1)
const total = ref(0)

const pagination = computed(() => {
  return {
    pageSize: pageSize.value,
    current: current.value,
    total: total.value,
    showSizeChanger: true
  }
})

// Variable
const columns = [
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: 'Fullname',
    dataIndex: 'fullname',
    key: 'fullname'
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role'
  },
  {
    title: 'Birthday',
    dataIndex: 'birthday',
    key: 'birthday'
  },
  {
    title: 'Tel',
    dataIndex: 'tel',
    key: 'tel'
  }
]

// Methods
const getUsers = async () => {
  try {
    usersLoading.value = true
    let data = {
      username: searchFormData.username,
      fullname: searchFormData.fullname,
      page: current.value,
      size: pageSize.value
    }
    let response = await commonApi.getUsers(data)
    if (response.data && response.data.success === true && response.data.data) {
      users.value = response.data?.data?.content ?? []
      total.value = response.data?.data?.totalElements
    } else throw new Error(response.data?.message)
  } catch (err) {
    notification.error({
      message: 'An error occurred, please try again!',
      description: err.message
    })
  } finally {
    usersLoading.value = false
  }
}
const handleChange = async (page) => {
  pageSize.value = page.pageSize
  current.value = page.current
  await getUsers()
}

// Run code
getUsers()
</script>
<template>
  <div>
    <h1 class="mb-8">Users</h1>
    <div class="flex gap-4 lg:flex-row flex-col mb-2">
      <Form :model="searchFormData" @finish="getUsers" layout="vertical" class="w-full">
        <div class="flex md:flex-row flex-col gap-x-4">
          <div class="flex-1">
            <FormItem name="username" label="Username:">
              <Input v-model:value="searchFormData.username" placeholder="Enter username" />
            </FormItem>
          </div>
          <div class="flex-1">
            <FormItem name="fullname" label="Fullname:">
              <Input v-model:value="searchFormData.fullname" placeholder="Enter fullname" />
            </FormItem>
          </div>
          <div class="md:self-end">
            <FormItem name="submit">
              <Button
                type="primary"
                :loading="usersLoading"
                html-type="submit"
                class="!flex items-center justify-center w-full"
              >
                <template #icon>
                  <SearchOutlined />
                </template>
                Search
              </Button>
            </FormItem>
          </div>
        </div>
      </Form>
    </div>
    <div>
      <Table
        :dataSource="users"
        :columns="columns"
        :pagination="pagination"
        @change="handleChange"
        :loading="usersLoading"
        bordered
      />
    </div>
  </div>
</template>
