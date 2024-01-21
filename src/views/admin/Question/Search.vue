<script setup>
import { commonApi } from '@/services'
import { Table, notification, Select, Button } from 'ant-design-vue'
import { computed, reactive, ref } from 'vue'

const parts = ref([])
const questions = ref([])
const pageSize = ref(10)
const current = ref(1)
const total = ref(0)
const partsLoading = ref(false)
const questionsLoading = ref(false)

const searchFormData = reactive({
  partId: '',
  type: ''
})

const partOptions = computed(() => {
  let options = [{ value: '', label: 'All' }]
  return [
    ...options,
    ...parts.value.map((item) => ({ value: item.id, label: item.sub_name + ' :' + item.name }))
  ]
})

const questionTypeOptions = ref([
  {
    value: '',
    label: 'All'
  },
  {
    value: 1,
    label: 'Image'
  },
  {
    value: 2,
    label: 'Audio'
  },
  {
    value: 3,
    label: 'Paragraph'
  }
])

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
    title: 'Id',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: 'Part Id',
    dataIndex: 'partId',
    key: 'partId'
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
getParts()

const getQuestions = async () => {
  try {
    questionsLoading.value = true
    let data = {
      page: current.value,
      size: pageSize.value,
      partId: searchFormData.partId,
      type: searchFormData.type
    }
    let response = await commonApi.getQuestions(data)
    if (response.data && response.data.success === true && response.data.data) {
      questions.value = response.data?.data?.content ?? []
      total.value = response.data?.data?.totalElements ?? 0
    } else throw new Error(response.data?.message)
  } catch (err) {
    notification.error({
      message: 'An error occurred, please try again!',
      description: err.message
    })
  } finally {
    questionsLoading.value = false
  }
}
getQuestions()

const handleChange = async (page) => {
  pageSize.value = page.pageSize
  current.value = page.current
  await getQuestions()
}

const typeToText = (typeId) => {
  return questionTypeOptions.value.find((item) => item.value === typeId)?.label
}

const partIdToText = (partId) => {
  return partOptions.value.find((item) => item.value === partId)?.label
}
</script>
<template>
  <div>
    <h1 class="mb-8">Questions</h1>
    <div class="flex gap-4 lg:flex-row flex-col mb-8">
      <Select
        :options="partOptions"
        v-model:value="searchFormData.partId"
        class="w-full"
        placeholder="Enter the part"
        :loading="partsLoading"
      >
      </Select>
      <Select
        :options="questionTypeOptions"
        v-model:value="searchFormData.type"
        class="w-full"
        placeholder="Enter the type"
        :loading="partsLoading"
      >
      </Select>
      <Button type="primary" :loading="questionsLoading" @click="getQuestions">Search</Button>
    </div>
    <div>
      <Table
        :dataSource="questions"
        :columns="columns"
        :pagination="pagination"
        @change="handleChange"
        :loading="questionsLoading"
        bordered
      >
        <template #bodyCell="{ text, column }">
          <template v-if="column.key === 'type'">
            <span>{{ typeToText(text) }}</span>
          </template>
          <template v-if="column.key === 'partId'">
            <span class="line-clamp-3">{{ partIdToText(text) }}</span>
          </template>
        </template>
      </Table>
    </div>
  </div>
</template>
