<script setup>
import { commonApi } from '@/services'
import { Table, notification, Select, Button, Modal, Form, FormItem } from 'ant-design-vue'
import { computed, reactive, ref } from 'vue'
import { DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons-vue'

// Reactive
const parts = ref([])
const partsLoading = ref(false)

const questions = ref([])
const questionsLoading = ref(false)

const pageSize = ref(10)
const current = ref(1)
const total = ref(0)

const searchFormData = reactive({
  partId: '',
  type: ''
})

const partOptions = computed(() => {
  let options = [{ value: '', label: 'All Parts' }]
  return [
    ...options,
    ...parts.value.map((item) => ({ value: item.id, label: item.sub_name + ' :' + item.name }))
  ]
})

// Variable
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

const questionTypeOptions = [
  {
    value: '',
    label: 'All Question Types'
  },
  ...questionTypes
]

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
    title: 'Part',
    dataIndex: 'partId',
    key: 'partId'
  },
  {
    title: 'Action',
    key: 'action',
    width: '88px'
  }
]

// Methods
const getParts = async () => {
  try {
    partsLoading.value = true
    let response = await commonApi.getPart()
    if (response.data && response.data.success === true && response.data.data) {
      parts.value = response.data?.data ?? []
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
const handleChange = async (page) => {
  pageSize.value = page.pageSize
  current.value = page.current
  await getQuestions()
}
const typeToText = (typeId) => {
  return questionTypeOptions.find((item) => item.value === typeId)?.label
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
        let response = await commonApi.deleteQuestion(data)
        if (response.data && response.data.success === true) {
          notification.success({
            message: 'The question has been deleted.'
          })
          getQuestions()
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

// Run code
getParts()
getQuestions()
</script>
<template>
  <div>
    <h1 class="mb-8">Questions</h1>
    <div class="flex gap-4 lg:flex-row flex-col mb-2">
      <Form :model="searchFormData" layout="vertical" @finish="getQuestions" class="w-full">
        <div class="flex md:flex-row flex-col gap-x-4">
          <div class="flex-1">
            <FormItem label="Part:" name="partId">
              <Select
                :options="partOptions"
                v-model:value="searchFormData.partId"
                class="w-full"
                placeholder="Enter the part"
                :loading="partsLoading"
              />
            </FormItem>
          </div>
          <div class="flex-1">
            <FormItem label="Question Type:" name="type">
              <Select
                :options="questionTypeOptions"
                v-model:value="searchFormData.type"
                class="w-full"
                placeholder="Enter the type"
                :loading="partsLoading"
              />
            </FormItem>
          </div>
          <div class="md:self-end">
            <FormItem>
              <Button
                type="primary"
                :loading="questionsLoading"
                html-type="submit"
                class="!flex items-center justify-center w-full"
                :disabled="partsLoading"
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
    <div class="mb-4">
      <RouterLink :to="{ name: 'adminQuestionAdd' }">
        <Button class="!inline-flex items-center" type="primary">
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
