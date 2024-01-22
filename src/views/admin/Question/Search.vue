<script setup>
import { commonApi } from '@/services'
import { Table, notification, Select, Button, Modal } from 'ant-design-vue'
import { computed, reactive, ref } from 'vue'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue'

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

const questionTypes = [
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
]

const questionTypeOptions = ref([
  {
    value: '',
    label: 'All'
  },
  ...questionTypes
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
  },
  {
    title: 'Action',
    key: 'action',
    width: '88px'
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

const handleDelete = (item) => {
  Modal.confirm({
    title: 'Do you want to delete the question?',
    onOk: async () => {
      try {
        let data = {
          id: item.id
        }
        console.log(data)
        let response = await commonApi.deleteQuestion(data)
        if (response.data && response.data.success === true) {
          notification.success({
            message: 'Question has been deleted'
          })
          await getQuestions()
        } else throw new Error(response.data?.message)
      } catch (err) {
        notification.error({
          message: 'An error occurred, please try again!',
          description: err.message
        })
      }
    }
  })
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
    <div class="mb-4">
      <RouterLink :to="{ name: 'adminQuestionAdd' }">
        <Button class="!inline-flex items-center" type="primary" @click="showAddModal">
          <template #icon>
            <PlusOutlined />
          </template>
          Add
        </Button>
      </RouterLink>
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
        <template #bodyCell="{ text, column, record }">
          <template v-if="column.key === 'type'">
            <span>{{ typeToText(text) }}</span>
          </template>
          <template v-if="column.key === 'partId'">
            <span class="line-clamp-3">{{ partIdToText(text) }}</span>
          </template>
          <template v-if="column.key === 'action'">
            <div class="flex gap-2">
              <Button @click="() => handleDelete(record)" class="!inline-flex !items-center" danger>
                <DeleteOutlined />
              </Button>
            </div>
          </template>
        </template>
      </Table>
    </div>
  </div>
</template>
