<script setup>
import { commonApi } from '@/services'
import { EditOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { Button, Form, FormItem, Modal, Table, notification, Input, Select } from 'ant-design-vue'
import { computed, ref } from 'vue'

// Reactive
const parts = ref([])
const partsLoading = ref(false)

const pageSize = ref(10)
const current = ref(1)
const total = ref(0)

const visibleModal = ref(false)
const isEdit = ref(false)
const partFormData = ref({
  subname: '',
  name: '',
  description: '',
  thumbnail: '',
  type: ''
})
const partFormDataRef = ref(null)
const confirmLoading = ref(false)

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
  subname: [{ required: true, message: 'Please enter the subname of the part!' }],
  name: [{ required: true, message: 'Please enter the name of the part!' }],
  type: [{ required: true, message: 'Please choose the type of the part!' }],
  description: [{ required: true, message: 'Please enter the description of the part!' }],
  thumbnail: [{ required: true, message: 'Please enter the thumbnail of the part!' }]
}

// Variable
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    width: '40%'
  },
  {
    title: 'Thumbnail',
    dataIndex: 'thumbnail',
    key: 'thumbnail'
  },
  {
    title: 'Sub name',
    dataIndex: 'sub_name',
    key: 'sub_name'
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    width: '88px'
  }
]
const partTypes = [
  {
    value: 1,
    label: 'Listening'
  },
  {
    value: 2,
    label: 'Reading'
  }
]

// Methods
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
const handleChange = async (page) => {
  pageSize.value = page.pageSize
  current.value = page.current
}
const showAddModal = () => {
  partFormData.value = {
    id: '',
    subname: '',
    name: '',
    description: '',
    thumbnail: '',
    type: ''
  }
  isEdit.value = false
  visibleModal.value = true
}
const showEditModal = (item) => {
  partFormData.value = {
    id: item.id,
    subname: item.sub_name,
    name: item.name,
    description: item.description,
    thumbnail: item.thumbnail,
    type: item.type
  }
  isEdit.value = true
  visibleModal.value = true
}
const handleSubmitFormInModal = async () => {
  try {
    await partFormDataRef.value.validateFields()
  } catch (err) {
    return
  }

  try {
    confirmLoading.value = true
    let data = {
      id: partFormData.value.id,
      subname: partFormData.value.subname,
      name: partFormData.value.name,
      description: partFormData.value.description,
      thumbnail: partFormData.value.thumbnail,
      type: partFormData.value.type
    }

    if (!isEdit.value) {
      let response = await commonApi.addPart(data)
      if (response.data && response.data.success === true) {
        notification.success({
          message: 'New part added successfully.'
        })
        getParts()
        visibleModal.value = false
      } else throw new Error(response.data?.message)
    } else if (isEdit.value) {
      let response = await commonApi.editPart(data)
      if (response.data && response.data.success === true) {
        notification.success({
          message: 'Part updated successfully.'
        })
        getParts()
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

// Run code
getParts()
</script>
<template>
  <div>
    <h1 class="mb-8">Parts</h1>
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
        :dataSource="parts"
        :columns="columns"
        :pagination="pagination"
        @change="handleChange"
        :loading="partsLoading"
        bordered
      >
        <template #bodyCell="{ text, column, record }">
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
          <template v-if="column.key === 'type'">
            <span v-if="text === 1">Listening</span>
            <span v-if="text === 2">Reading</span>
          </template>
          <template v-if="column.key === 'action'">
            <div class="flex gap-2">
              <Button @click="() => showEditModal(record)" class="!inline-flex !items-center">
                <EditOutlined />
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
        :title="isEdit ? 'Edit Part' : 'Add Part'"
        :confirmLoading="confirmLoading"
        okText="Submit"
        @ok="handleSubmitFormInModal"
      >
        <div>
          <Form layout="vertical" :model="partFormData" :rules="rules" ref="partFormDataRef">
            <FormItem label="Sub Name" name="subname">
              <Input v-model:value="partFormData.subname" />
            </FormItem>
            <FormItem label="Name" name="name">
              <Input v-model:value="partFormData.name" />
            </FormItem>
            <FormItem label="Description" name="description">
              <Input v-model:value="partFormData.description" />
            </FormItem>
            <FormItem label="Thumbnail" name="thumbnail">
              <Input v-model:value="partFormData.thumbnail" />
            </FormItem>
            <FormItem label="Type" name="type">
              <Select :options="partTypes" v-model:value="partFormData.type" />
            </FormItem>
          </Form>
        </div>
      </Modal>
    </Teleport>
  </div>
</template>
