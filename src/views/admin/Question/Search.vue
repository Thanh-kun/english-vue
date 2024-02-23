<script setup>
import { commonApi } from '@/services'
import {
  Table,
  notification,
  Select,
  Button,
  Modal,
  Form,
  FormItem,
  Image,
  RadioGroup,
  Radio
} from 'ant-design-vue'
import { computed, reactive, ref } from 'vue'
import { DeleteOutlined, PlusOutlined, SearchOutlined, EyeOutlined } from '@ant-design/icons-vue'

// Reactive
const parts = ref([])
const partsLoading = ref(false)

const questions = ref([])
const questionsLoading = ref(false)

const pageSize = ref(10)
const current = ref(1)
const total = ref(0)

const visibleModal = ref(false)
const showQuestion = ref({})

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
    width: '144px'
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
const showDetailQuestionModal = (item) => {
  visibleModal.value = true
  showQuestion.value = item
}
const handleOk = () => {
  visibleModal.value = false
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
              <Button
                @click="() => showDetailQuestionModal(record)"
                class="!inline-flex !items-center"
                type="primary"
                ghost
              >
                <EyeOutlined />
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
        class="!w-full !max-w-4xl mx-8"
        title="Question Info"
        okText="Ok"
        @ok="handleOk"
      >
        <div>
          <div class="mb-4">
            <div class="mr-2 font-semibold">Name:</div>
            <div>{{ showQuestion?.name }}</div>
          </div>
          <div class="mb-4">
            <div class="mr-2 font-semibold">Type:</div>
            <div>{{ typeToText(showQuestion?.type) }}</div>
          </div>
          <div class="mb-4">
            <div class="mr-2 font-semibold">Part:</div>
            <div>{{ partIdToText(showQuestion?.partId) }}</div>
          </div>
          <div class="mb-4" v-if="showQuestion?.question?.image">
            <div class="mr-2 font-semibold">Photograph:</div>
            <div
              class="w-fit max-h-[50dvh] mx-auto rounded border shadow mb-4 min-h-40 min-w-40 flex"
            >
              <Image
                :src="showQuestion?.question.image"
                fallback="data:image/png;base64,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"
                alt=""
                class="w-fit mx-auto h-full object-cover"
              />
            </div>
          </div>
          <div class="mb-4" v-if="showQuestion?.question?.audio">
            <div class="mr-2 font-semibold">Audio:</div>
            <div class="flex justify-center mb-4">
              <audio controls>
                <source :src="showQuestion.question?.audio" type="audio/mpeg" />
              </audio>
            </div>
          </div>
          <div class="mb-4" v-if="showQuestion?.question?.content">
            <div class="mr-2 font-semibold">Content:</div>
            <div>
              {{ showQuestion?.question.content }}
            </div>
          </div>
          <div class="mb-4" v-if="showQuestion?.answers">
            <div class="mr-2 font-semibold">Answers:</div>
            <div>
              <RadioGroup>
                <div v-for="answer of showQuestion.answers" :key="answer.id" class="block mb-2">
                  <Radio :value="answer.id">{{ answer.content }}</Radio>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </Modal>
    </Teleport>
  </div>
</template>
