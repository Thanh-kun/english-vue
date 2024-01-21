<script setup>
import { commonApi } from '@/services'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { Table, notification, Select, Button, Form, FormItem, Input, Modal } from 'ant-design-vue'
import { computed, reactive, ref } from 'vue'
import Editor from '@tinymce/tinymce-vue'

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

const isEdit = ref(false)
const lessonFormData = ref({
  name: '',
  content: '',
  partId: ''
})
const confirmLoading = ref(false)
const visibleModal = ref(false)
const lessonFormDataRef = ref()

const rules = {
  name: [{ required: true, message: 'Please input name!' }],
  content: [{ required: true, message: 'Please input content!' }],
  partId: [{ required: true, message: 'Please input part!' }]
}

const partOptions = computed(() => {
  return parts.value.map((item) => ({ value: item.id, label: item.sub_name + ': ' + item.name }))
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
  },
  {
    title: 'Action',
    key: 'action'
  }
]

const getParts = async () => {
  try {
    partsLoading.value = true
    let response = await commonApi.getPart()
    if (response.data && response.data.success === true && response.data.data) {
      parts.value = response.data?.data ?? []
      searchFormData.partId = parts.value.length > 0 ? parts.value[0].id : undefined
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
getLessons()

const handleChange = async (page) => {
  pageSize.value = page.pageSize
  current.value = page.current
}

const partIdToText = (partId) => {
  return partOptions.value.find((item) => item.value === partId)?.label
}

const showAddModal = () => {
  lessonFormData.value = {
    id: '',
    name: '',
    content: '',
    partId: ''
  }
  isEdit.value = false
  visibleModal.value = true
}

const showEditModal = (item) => {
  lessonFormData.value = {
    id: item.id,
    name: item.name,
    content: item.content,
    partId: item.part_id
  }
  isEdit.value = true
  visibleModal.value = true
}

const handleSubmitFormInModal = async () => {
  try {
    // eslint-disable-next-line no-unused-vars
    let values = await lessonFormDataRef.value.validateFields()
    console.log(lessonFormData.value)
    let data = {
      id: lessonFormData.value.id,
      name: lessonFormData.value.name,
      content: lessonFormData.value.content,
      partId: lessonFormData.value.partId
    }
    let response
    confirmLoading.value = true
    if (!isEdit.value) {
      response = await commonApi.addLesson(data)
      if (response.data && response.data.success === true) {
        notification.success({
          message: 'New lesson added'
        })
        await getLessons()
        visibleModal.value = false
      } else throw new Error(response.data?.message)
    } else if (isEdit.value) {
      response = await commonApi.editLesson(data)
      if (response.data && response.data.success === true) {
        notification.success({
          message: 'Updated added'
        })
        await getLessons()
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
    title: 'Do you want to delete the lesson?',
    onOk: async () => {
      try {
        let data = {
          id: item.id
        }
        let response = await commonApi.deleteLesson(data)
        if (response.data && response.data.success === true) {
          notification.success({
            message: 'Lesson has been deleted'
          })
          await getLessons()
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
    <h1 class="mb-8">Lessons</h1>
    <div class="flex gap-4 lg:flex-row flex-col mb-8">
      <Select
        :options="partOptions"
        v-model:value="searchFormData.partId"
        class="w-full"
        placeholder="Enter the part"
        :loading="partsLoading"
      >
      </Select>
      <Button type="primary" :loading="lessonsLoading" @click="getLessons">Search</Button>
    </div>
    <div class="mb-8">
      <Button class="!inline-flex items-center" type="primary" @click="showAddModal">
        <template #icon>
          <PlusOutlined />
        </template>
        Add
      </Button>
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
        <template #bodyCell="{ text, column, record }">
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
          <template v-if="column.key === 'part_id'">
            <span class="line-clamp-3" :title="partIdToText(text)">{{ partIdToText(text) }}</span>
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
        :title="isEdit ? 'Edit Lesson' : 'Add Lesson'"
        :confirmLoading="confirmLoading"
        okText="Submit"
        @ok="handleSubmitFormInModal"
      >
        <div>
          <Form layout="vertical" :model="lessonFormData" :rules="rules" ref="lessonFormDataRef">
            <FormItem label="Name" name="name">
              <Input v-model:value="lessonFormData.name" />
            </FormItem>
            <FormItem label="Content" name="content">
              <!-- <Input v-model:value="lessonFormData.content" /> -->
              <Editor
                api-key="uwz9im0bsj2tdn6ekifzoq0trcgaksh3y7ddgkrbrue65hyc"
                :init="{
                  height: 500,
                  menubar: false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                  ],
                  toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                      alignleft aligncenter alignright alignjustify | \
                      bullist numlist outdent indent | removeformat | help'
                }"
                v-model="lessonFormData.content"
              />
            </FormItem>
            <FormItem label="Part" name="partId">
              <Select
                :options="partOptions"
                v-model:value="lessonFormData.partId"
                class="w-full"
                placeholder="Enter the part"
                :loading="partsLoading"
              >
              </Select>
            </FormItem>
          </Form>
        </div>
      </Modal>
    </Teleport>
  </div>
</template>
