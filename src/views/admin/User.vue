<script setup>
import { commonApi } from '@/services'
import { SearchOutlined } from '@ant-design/icons-vue'
import { Button, Form, Input, Table, notification } from 'ant-design-vue'
import { computed, reactive, ref } from 'vue'

const users = ref([])

const searchFormData = reactive({
  username: undefined,
  fullname: undefined
})

const pageSize = ref(10)
const current = ref(1)
const total = ref(0)
const loading = ref(false)

const pagination = computed(() => {
  return {
    pageSize: pageSize.value,
    current: current.value,
    total: total.value,
    showSizeChanger: true
  }
})

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
    dataIndex: 'el',
    key: 'tel'
  }
]

const getUsers = async () => {
  try {
    loading.value = true
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
    loading.value = false
  }
}
getUsers()

const handleChange = async (page) => {
  pageSize.value = page.pageSize
  current.value = page.current
  await getUsers()
}
</script>
<template>
  <div>
    <h1 class="mb-8">Users</h1>
    <Form @click="getUsers">
      <div class="flex gap-4 lg:flex-row flex-col mb-8">
        <Input v-model:value="searchFormData.username" placeholder="Enter username" />
        <Input v-model:value="searchFormData.fullname" placeholder="Enter fullname" />
        <Button
          type="primary"
          :loading="lessonsLoading"
          htmlType="submit"
          class="!flex items-center"
        >
          <template #icon>
            <SearchOutlined />
          </template>
          Search
        </Button>
      </div>
    </Form>
    <div>
      <Table
        :dataSource="users"
        :columns="columns"
        :pagination="pagination"
        @change="handleChange"
        :loading="loading"
        bordered
      />
    </div>
  </div>
</template>
