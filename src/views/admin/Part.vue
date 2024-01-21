<script setup>
import { commonApi } from '@/services'
import { Table, notification } from 'ant-design-vue'
import { computed, ref } from 'vue'

const parts = ref([])
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
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: 'Thumbnail',
    dataIndex: 'thumbnail',
    key: 'thumbnail'
  },
  {
    title: 'Sub_name',
    dataIndex: 'sub_name',
    key: 'sub_name'
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type'
  }
]

const getParts = async () => {
  try {
    loading.value = true
    let response = await commonApi.getPart()
    if (response.data && response.data.success === true && response.data.data) {
      parts.value = response.data?.data ?? []
      total.value = parts.value.length
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
await getParts()

const handleChange = async (page) => {
  pageSize.value = page.pageSize
  current.value = page.current
  // await getParts();
}
</script>
<template>
  <div>
    <h1 class="mb-8">Parts</h1>
    <div>
      <Table
        :dataSource="parts"
        :columns="columns"
        :pagination="pagination"
        @change="handleChange"
        :loading="loading"
        bordered
      >
        <template #bodyCell="{ text, column }">
          <template v-if="column.key === 'description'">
            <div class="line-clamp-3" :title="text">
              {{ text }}
            </div>
          </template>
          <template v-if="column.key === 'thumbnail'">
            <a target="_blank" :href="text" class="line-clamp-3" :title="text">
              {{ text }}
            </a>
          </template>
        </template>
      </Table>
    </div>
  </div>
</template>
