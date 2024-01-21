<script setup>
import { commonApi } from '@/services'
import { Table, notification, Select, Button } from 'ant-design-vue'
import { computed, reactive, ref } from 'vue'

const parts = ref([])
const lessons = ref([])
const pageSize = ref(10)
const current = ref(1)
const total = ref(0)
const partsLoading = ref(false)
const lessonsLoading = ref(false)

const searchFormData = reactive({
  partId: undefined
})

const partOptions = computed(() => {
  return parts.value.map((item) => ({ value: item.id, label: item.sub_name + ' :' + item.name }))
})

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
    title: 'Content',
    dataIndex: 'content',
    key: 'content'
  },
  {
    title: 'Part_id',
    dataIndex: 'part_id',
    key: 'part_id'
  },
  {
    title: 'Created at',
    dataIndex: 'created_at',
    key: 'created_at'
  }
]

const getParts = async () => {
  try {
    partsLoading.value = true
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
    partsLoading.value = false
  }
}
await getParts()

const getLessons = async () => {
  try {
    lessonsLoading.value = true
    let response = await commonApi.getLesson(searchFormData.partId)
    if (response.data && response.data.success === true && response.data.data) {
      lessons.value = response.data?.data ?? []
      total.value = lessons.value.length
    } else throw new Error(response.data?.message)
  } catch (err) {
    notification.error({
      message: 'An error occurred, please try again!',
      description: err.message
    })
  } finally {
    lessonsLoading.value = false
  }
}

const handleChange = async (page) => {
  pageSize.value = page.pageSize
  current.value = page.current
}
</script>
<template>
  <div>
    <h1 class="mb-8">Lessons</h1>
    <div class="flex gap-4 lg:flex-row flex-col mb-8">
      <Select
        :options="partOptions"
        v-model:value="searchFormData.partId"
        class="w-full"
        :loading="partsLoading"
      >
      </Select>
      <Button type="primary" :loading="lessonsLoading" @click="getLessons">Search</Button>
    </div>
    <div>
      <Table
        :dataSource="lessons"
        :columns="columns"
        :pagination="pagination"
        @change="handleChange"
        :loading="lessonsLoading"
        bordered
      >
        <template #bodyCell="{ text, column }">
          <template v-if="column.key === 'name'">
            <div class="line-clamp-3" :title="text">
              {{ text }}
            </div>
          </template>
          <template v-if="column.key === 'content'">
            <div class="line-clamp-3" :title="text">
              {{ text }}
            </div>
          </template>
          <template v-if="column.key === 'created_at'">
            <div class="line-clamp-3" :title="text">
              {{ text }}
            </div>
          </template>
        </template>
      </Table>
    </div>
  </div>
</template>
