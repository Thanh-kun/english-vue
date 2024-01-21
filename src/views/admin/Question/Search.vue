<script setup>
import { commonApi } from '@/services'
import { Table, notification, Select, Button, Modal, Form, FormItem, Input } from 'ant-design-vue'
import { computed, reactive, ref } from 'vue'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons-vue'

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

const isEdit = ref(false)
const questionFormData = ref({
  content: '',
  name: '',
  answers: '',
  trueAnswer: '',
  type: '',
  partId: '',
  image: '',
  audio: ''
})
const confirmLoading = ref(false)
const visibleModal = ref(false)
const questionFormDataRef = ref()

const partOptions = computed(() => {
  let options = [{ value: '', label: 'All' }]
  return [
    ...options,
    ...parts.value.map((item) => ({ value: item.id, label: item.sub_name + ' :' + item.name }))
  ]
})

const partItems = computed(() => {
  return [
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
    key: 'action'
  }
]

const rules = {
  name: [{ required: true, message: 'Please input name!' }],
  answers: [{ required: true, message: 'Please input answers!' }],
  trueAnswer: [{ required: true, message: 'Please input trueAnswer!' }],
  type: [{ required: true, message: 'Please input type!' }],
  partId: [{ required: true, message: 'Please input part!' }]
}

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

const showAddModal = () => {
  questionFormData.value = {
    id: '',
    content: '',
    name: '',
    answers: '',
    trueAnswer: '',
    type: '',
    partId: '',
    image: '',
    audio: ''
  }
  isEdit.value = false
  visibleModal.value = true
}

const showEditModal = (item) => {
  questionFormData.value = {
    id: item.id,
    content: item.content,
    name: item.name,
    answers: item.answers,
    trueAnswer: item.trueAnswer,
    type: item.type,
    partId: item.partId,
    image: item.image,
    audio: item.audio
  }
  isEdit.value = true
  visibleModal.value = true
}

const handleSubmitFormInModal = async () => {
  try {
    // eslint-disable-next-line no-unused-vars
    let values = await questionFormDataRef.value.validateFields()
    console.log(questionFormData.value)
    let data = {
      id: questionFormData.value.id,
      content: questionFormData.value.content,
      name: questionFormData.value.name,
      answers: questionFormData.value.answers,
      trueAnswer: questionFormData.value.trueAnswer,
      type: questionFormData.value.type,
      partId: questionFormData.value.partId,
      image: questionFormData.value.image,
      audio: questionFormData.value.audio
    }
    let response
    confirmLoading.value = true
    if (!isEdit.value) {
      response = await commonApi.addQuestion(data)
      if (response.data && response.data.success === true) {
        notification.success({
          message: 'New question added'
        })
        await getQuestions()
        visibleModal.value = false
      } else throw new Error(response.data?.message)
    }
  } catch (err) {
    notification.error({
      message: 'An error occurred, please try again!',
      description: err.message
    })
  } finally {
    confirmLoading.value = false
  }
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
    <div class="mb-8">
      <Button class="!inline-flex items-center" type="primary" @click="showAddModal">
        <template #icon>
          <PlusOutlined />
        </template>
        Add
      </Button>
    </div>
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
        <template #bodyCell="{ text, column, record }">
          <template v-if="column.key === 'type'">
            <span>{{ typeToText(text) }}</span>
          </template>
          <template v-if="column.key === 'partId'">
            <span class="line-clamp-3">{{ partIdToText(text) }}</span>
          </template>
          <template v-if="column.key === 'action'">
            <div class="flex gap-2">
              <Button @click="() => showEditModal(record)" class="!inline-flex !items-center">
                <EditOutlined />
              </Button>
              <Button @click="() => handleDelete(record)" class="!inline-flex !items-center" danger>
                <DeleteOutlined />
              </Button>
            </div>
          </template>
        </template>
      </Table>
    </div>
    <Teleport to="body">
      <Modal
        v-model:open="visibleModal"
        class="!w-full !max-w-4xl"
        :title="isEdit ? 'Edit Question' : 'Add Question'"
        :confirmLoading="confirmLoading"
        okText="Submit"
        @ok="handleSubmitFormInModal"
      >
        <div>
          <Form
            layout="vertical"
            :model="questionFormData"
            :rules="rules"
            ref="questionFormDataRef"
          >
            <FormItem label="Name" name="name">
              <Input v-model:value="questionFormData.name" />
            </FormItem>
            <FormItem label="Type" name="type">
              <Select
                :options="questionTypes"
                v-model:value="questionFormData.type"
                class="w-full"
                placeholder="Enter the part"
                :loading="partsLoading"
              >
              </Select>
            </FormItem>
            <FormItem label="Part" name="partId">
              <Select
                :options="partItems"
                v-model:value="questionFormData.partId"
                class="w-full"
                placeholder="Enter the part"
                :loading="partsLoading"
              >
              </Select>
            </FormItem>
            <FormItem label="Answers" name="answers">
              <Input v-model:value="questionFormData.answers" />
            </FormItem>
            <FormItem label="True Answer" name="trueAnswer">
              <Input v-model:value="questionFormData.trueAnswer" />
            </FormItem>
            <FormItem label="Content" name="content">
              <Input v-model:value="questionFormData.content" />
            </FormItem>
            <FormItem label="Image" name="image">
              <Input v-model:value="questionFormData.image" />
            </FormItem>
            <FormItem label="Audio" name="audio">
              <Input v-model:value="questionFormData.audio" />
            </FormItem>
          </Form>
        </div>
      </Modal>
    </Teleport>
  </div>
</template>
