<script setup>
import { commonApi } from '@/services'
import { Table, notification } from 'ant-design-vue'
import { computed, ref } from 'vue'

const users = ref([])
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
