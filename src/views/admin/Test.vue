<script setup>
import { commonApi } from '@/services'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons-vue'
import { Table, notification, Select, Button, Modal, FormItem, Form, Input } from 'ant-design-vue'
import { computed, reactive, ref } from 'vue'

const parts = ref([])
const tests = ref([])
const pageSize = ref(10)
const current = ref(1)
const total = ref(0)
const partsLoading = ref(false)
const testsLoading = ref(false)

const searchFormData = reactive({
  partId: ''
})

const isEdit = ref(false)
const testFormData = ref({
  name: '',
  partId: ''
})
const confirmLoading = ref(false)
const visibleModal = ref(false)
const testFormDataRef = ref()

const rules = {
  name: [{ required: true, message: 'Please input name!' }],
  partId: [{ required: true, message: 'Please input part!' }]
}

const partItems = computed(() => {
  return parts.value.map((item) => ({ value: item.id, label: item.sub_name + ' :' + item.name }))
})

const partOptions = computed(() => {
  let options = [{ value: '', label: 'All Parts' }]
  return [...options, ...partItems.value]
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
    title: 'Part Id',
    dataIndex: 'part_id',
    key: 'part_id'
  },
  {
    title: 'Action',
    key: 'action',
    width: '144px'
  }
]

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
    // eslint-disable-next-line no-unused-vars
    let values = await testFormDataRef.value.validateFields()
    console.log(testFormData.value)
    let data = {
      id: testFormData.value.id,
      name: testFormData.value.name,
      partId: testFormData.value.partId
    }
    let response
    confirmLoading.value = true
    if (!isEdit.value) {
      response = await commonApi.addTest(data)
      if (response.data && response.data.success === true) {
        notification.success({
          message: 'New test added'
        })
        await getTests()
        visibleModal.value = false
      } else throw new Error(response.data?.message)
    } else if (isEdit.value) {
      response = await commonApi.editTest(data)
      if (response.data && response.data.success === true) {
        notification.success({
          message: 'Updated test'
        })
        await getTests()
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
          await getTests()
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
    <div class="flex gap-4 lg:flex-row flex-col mb-8">
      <Select
        :options="partOptions"
        v-model:value="searchFormData.partId"
        class="w-full"
        placeholder="Enter the part"
        :loading="partsLoading"
      >
      </Select>
      <Button
        type="primary"
        :loading="testsLoading"
        @click="getTests"
        htmlType="submit"
        class="!flex items-center"
      >
        <template #icon>
          <SearchOutlined />
        </template>
        Search
      </Button>
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
