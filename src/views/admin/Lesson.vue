<script setup>
import { commonApi } from '@/services'
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons-vue'
import { Table, notification, Select, Button, Form, FormItem, Input, Modal } from 'ant-design-vue'
import { computed, reactive, ref } from 'vue'
import Editor from '@tinymce/tinymce-vue'

const parts = ref([])
const partsLoading = ref(false)

const lessons = ref([])
const lessonsLoading = ref(false)

const pageSize = ref(10)
const current = ref(1)
const total = ref(0)

const searchFormData = reactive({
  partId: undefined
})

const visibleModal = ref(false)
const isEdit = ref(false)
const lessonFormData = ref({
  name: '',
  content: '',
  partId: ''
})
const lessonFormDataRef = ref()
const confirmLoading = ref(false)

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

// Validate Form
const rules = {
  name: [{ required: true, message: 'Please enter the lesson name!' }],
  content: [{ required: true, message: 'Please enter the lesson content!' }],
  partId: [{ required: true, message: 'Please select the part to which the lesson belongs!' }]
}

// Variable
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Content',
    dataIndex: 'content',
    key: 'content',
    width: '40%'
  },
  {
    title: 'Part',
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
    await lessonFormDataRef.value.validateFields()
  } catch (err) {
    return
  }

  try {
    confirmLoading.value = true
    let data = {
      id: lessonFormData.value.id,
      name: lessonFormData.value.name,
      content: lessonFormData.value.content,
      partId: lessonFormData.value.partId
    }

    if (!isEdit.value) {
      let response = await commonApi.addLesson(data)
      if (response.data && response.data.success === true) {
        notification.success({
          message: 'New lesson added successfully'
        })
        getLessons()
        visibleModal.value = false
      } else throw new Error(response.data?.message)
    } else if (isEdit.value) {
      let response = await commonApi.editLesson(data)
      if (response.data && response.data.success === true) {
        notification.success({
          message: 'Lesson updated successfully'
        })
        getLessons()
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
            message: 'Lesson deleted successfully'
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

// Run code
await getParts()
searchFormData.partId = parts.value.length > 0 ? parts.value[0].id : undefined
getLessons()
</script>
<template>
  <div>
    <h1 class="mb-8">Lessons</h1>
    <div class="flex gap-4 lg:flex-row flex-col mb-2">
      <Form :model="searchFormData" layout="vertical" @finish="getLessons" class="w-full">
        <div class="flex md:flex-row flex-col gap-x-4">
          <div class="flex-1">
            <FormItem label="Part:" name="partId">
              <Select
                :options="partOptions"
                v-model:value="searchFormData.partId"
                class="w-full"
                placeholder="Enter the part"
                :loading="partsLoading"
              >
              </Select>
            </FormItem>
          </div>
          <div class="md:self-end">
            <FormItem>
              <Button
                type="primary"
                :loading="lessonsLoading"
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
                api-key="jmjlsi835glcznkh7lsrl8u3detztdv79l0y5nk73mh57ixk"
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
