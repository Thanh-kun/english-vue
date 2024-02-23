<script setup>
import { commonApi } from '@/services'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons-vue'
import { Table, notification, Select, Button, Modal, FormItem, Form, Input } from 'ant-design-vue'
import { computed, reactive, ref } from 'vue'

// Reactive
const parts = ref([])
const partsLoading = ref(false)

const tests = ref([])
const testsLoading = ref(false)

const pageSize = ref(10)
const current = ref(1)
const total = ref(0)

const searchFormData = reactive({
  partId: ''
})

const visibleModal = ref(false)
const isEdit = ref(false)
const testFormData = ref({
  name: '',
  partId: ''
})
const testFormDataRef = ref()
const confirmLoading = ref(false)

const pagination = computed(() => {
  return {
    pageSize: pageSize.value,
    current: current.value,
    total: total.value,
    showSizeChanger: true
  }
})
const partItems = computed(() => {
  return parts.value.map((item) => ({ value: item.id, label: item.sub_name + ' :' + item.name }))
})
const partOptions = computed(() => {
  let options = [{ value: '', label: 'All Parts' }]
  return [...options, ...partItems.value]
})

// Variable
const rules = {
  name: [{ required: true, message: 'Please enter the test name!' }],
  partId: [{ required: true, message: 'Please select the part to which the test belongs!' }]
}
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
    title: 'Participant',
    dataIndex: 'participant',
    key: 'participant'
  },
  {
    title: 'Part',
    dataIndex: 'part_id',
    key: 'part_id'
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
const getTests = async () => {
  try {
    testsLoading.value = true
    let data = {
      page: current.value,
      size: pageSize.value,
      partId: searchFormData.partId
    }
    let response = await commonApi.getTests(data)
    if (response.data && response.data.success === true && response.data.data) {
      tests.value = response.data?.data?.content ?? []
      total.value = response.data?.data?.totalElements ?? 0
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
const handleChange = async (page) => {
  pageSize.value = page.pageSize
  current.value = page.current
  await getTests()
}
const partIdToText = (partId) => {
  return partOptions.value.find((item) => item.value === partId)?.label
}
const showAddModal = () => {
  testFormData.value = {
    id: '',
    name: '',
    partId: ''
  }
  isEdit.value = false
  visibleModal.value = true
}
const showEditModal = (item) => {
  testFormData.value = {
    id: item.id,
    name: item.name,
    partId: item.part_id
  }
  isEdit.value = true
  visibleModal.value = true
}
const handleSubmitFormInModal = async () => {
  try {
    await testFormDataRef.value.validateFields()
  } catch (err) {
    return
  }

  try {
    confirmLoading.value = true
    let data = {
      id: testFormData.value.id,
      name: testFormData.value.name,
      partId: testFormData.value.partId
    }
    if (!isEdit.value) {
      let response = await commonApi.addTest(data)
      if (response.data && response.data.success === true) {
        notification.success({
          message: 'New test added successfully.'
        })
        getTests()
        visibleModal.value = false
      } else throw new Error(response.data?.message)
    } else if (isEdit.value) {
      let response = await commonApi.editTest(data)
      if (response.data && response.data.success === true) {
        notification.success({
          message: 'Test updated successfully.'
        })
        getTests()
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
    title: 'Do you want to delete the test?',
    onOk: async () => {
      try {
        let data = {
          id: item.id
        }
        let response = await commonApi.deleteTest(data)
        if (response.data && response.data.success === true) {
          notification.success({
            message: 'Test has been deleted'
          })
          getTests()
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
    <h1 class="mb-8">Tests</h1>
    <div class="flex gap-4 lg:flex-row flex-col mb-2">
      <Form :model="searchFormData" layout="vertical" @finish="getTests" class="w-full">
        <div class="flex md:flex-row flex-col gap-x-4">
          <div class="flex-1">
            <FormItem name="partId" label="Part:">
              <Select
                :options="partOptions"
                v-model:value="searchFormData.partId"
                class="w-full"
                placeholder="Enter the part"
                :loading="partsLoading"
              />
            </FormItem>
          </div>
          <div class="md:self-end">
            <FormItem>
              <Button
                type="primary"
                :loading="testsLoading"
                htmlType="submit"
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
        :dataSource="tests"
        :columns="columns"
        :pagination="pagination"
        @change="handleChange"
        :loading="testsLoading"
        bordered
      >
        <template #bodyCell="{ text, column, record }">
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
        :title="isEdit ? 'Edit Test' : 'Add Test'"
        :confirmLoading="confirmLoading"
        okText="Submit"
        @ok="handleSubmitFormInModal"
      >
        <div>
          <Form layout="vertical" :model="testFormData" :rules="rules" ref="testFormDataRef">
            <FormItem label="Name" name="name">
              <Input v-model:value="testFormData.name" />
            </FormItem>
            <FormItem label="Part" name="partId">
              <Select
                :options="partItems"
                v-model:value="testFormData.partId"
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
