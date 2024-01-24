<script setup>
import { commonApi } from '@/services'
import { Table, notification, Select, Button, Modal, Form, FormItem } from 'ant-design-vue'
import { computed, reactive, ref } from 'vue'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue'

// Reactive
const parts = ref([])
const partsLoading = ref(false)

const tests = ref([])
const testsLoading = ref(false)

const questions = ref([])
const pageSize = ref(10)
const current = ref(1)
const total = ref(0)
const questionsLoading = ref(false)

const searchFormData = reactive({
  partId: undefined,
  testId: undefined
})

const pagination = computed(() => {
  return {
    pageSize: pageSize.value,
    current: current.value,
    total: total.value,
    showSizeChanger: true
  }
})
const partOptions = computed(() => {
  return parts.value.map((item) => ({ value: item.id, label: item.sub_name + ': ' + item.name }))
})
const testOptions = computed(() => {
  return tests.value
    .filter((item) => item.part_id === searchFormData.partId)
    .map((item) => ({ value: item.id, label: item.name }))
})

const searchRules = {
  partId: [{ required: true, message: 'Please select the part to search' }],
  testId: [{ required: true, message: 'Please select the test to search' }]
}
// Options
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

// Methods
const handleChangePartInSearch = () => {
  searchFormData.testId = undefined
}
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

const getTests = async () => {
  try {
    testsLoading.value = true
    let response = await commonApi.getTests({ page: 1, size: 1000000 })
    if (response.data && response.data.success === true && response.data.data) {
      tests.value = response.data?.data?.content ?? []
      console.log(tests.value)
    } else throw new Error(response.data?.message)
  } catch (err) {
    notification.error({
      message: 'An error occurred, please try again!',
      description: err.message
    })
  } finally {
    testsLoading.value = false
  }
}

const getQuestions = async () => {
  try {
    questionsLoading.value = true
    let response = await commonApi.getTestById(searchFormData.testId)
    if (response.data && response.data.success === true && response.data.data) {
      questions.value = response.data?.data?.questions ?? []
      total.value = response.data?.data?.questions.length ?? 0
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
  return questionTypes.find((item) => item.value === typeId)?.label
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

getParts()
getTests()
</script>
<template>
  <div>
    <h1 class="mb-8">Questions</h1>
    <div class="flex gap-4 lg:flex-row flex-col mb-8">
      <Form :rules="searchRules" :model="searchFormData" layout="vertical" @finish="getQuestions" class="w-full">
        <div class="flex md:flex-row flex-col gap-4">
          <div class="flex-1">
            <FormItem label="Part" name="partId" class="flex-1">
              <Select
                :options="partOptions"
                v-model:value="searchFormData.partId"
                class="w-full"
                placeholder="Enter the part"
                :loading="partsLoading"
                @change="handleChangePartInSearch"
              >
              </Select>
            </FormItem>
          </div>
          <div class="flex-1">
            <FormItem label="Test" name="testId" class="flex-1">
              <Select
                :options="testOptions"
                v-model:value="searchFormData.testId"
                class="w-full"
                placeholder="Enter the test"
                :loading="testsLoading"
                :disabled="!searchFormData.partId"
              >
              </Select>
            </FormItem>
          </div>
          <div class="self-end">
            <FormItem>
              <Button type="primary" :loading="questionsLoading" html-type="submit" :disabled="partsLoading || testsLoading">Search</Button>
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
