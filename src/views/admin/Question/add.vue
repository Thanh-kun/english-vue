<script setup>
import { commonApi } from '@/services'
import { getBase64 } from '@/utils'
import { PlusOutlined } from '@ant-design/icons-vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  Select,
  notification,
  Upload,
  message,
  RadioGroup,
  Radio
} from 'ant-design-vue'
import { computed, nextTick, reactive, ref } from 'vue'

// Reactive
const parts = ref([])
const partsLoading = ref(false)

const tests = ref([])
const testsLoading = ref(false)

const questionFormData = reactive({
  content: '',
  name: undefined,
  answer1: undefined,
  answer2: undefined,
  answer3: undefined,
  answer4: undefined,
  trueAnswer: undefined,
  type: 3,
  partId: undefined,
  testId: undefined,
  image: undefined,
  audio: undefined
})
const questionFormDataRef = ref(null)
const audioRef = ref(null)
const submitLoading = ref(false)
const imageInfo = ref({
  file: null,
  previewUrl: ''
})
const audioInfo = ref({
  file: null,
  previewUrl: ''
})

const partItems = computed(() => {
  return parts.value.map((item) => ({ value: item.id, label: item.sub_name + ' :' + item.name }))
})

const testOptions = computed(() => {
  return tests.value
    .filter((item) => item.part_id === questionFormData.partId)
    .map((item) => ({ value: item.id, label: item.name }))
})

// Select Options
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

// Validte Form
const validateImage = async (_rule, value) => {
  if (questionFormData.type === 1 && !value) {
    return Promise.reject(
      'Please add an image if the question type you selected is an image-based question!'
    )
  }
  return Promise.resolve()
}
const validateAudio = async (_rule, value) => {
  if (questionFormData.type === 2 && !value) {
    return Promise.reject(
      'Please add audio if the question type you selected is an audio-based question!'
    )
  }
  return Promise.resolve()
}
const rules = {
  name: [{ required: true, message: 'Please enter a description of the question type!' }],
  trueAnswer: [{ required: true, message: 'Please choose the correct answer' }],
  type: [{ required: true, message: 'Please enter the question type!' }],
  partId: [
    { required: true, message: 'Please specify the section to which the question belongs!' }
  ],
  testId: [{ required: true, message: 'Please specify the test to which the question belongs!' }],
  answer1: [{ required: true, message: 'Please enter the first answer!' }],
  answer2: [{ required: true, message: 'Please enter the second answer!' }],
  answer3: [{ required: true, message: 'Please enter the third answer!' }],
  answer4: [{ required: true, message: 'Please enter the fourth answer!' }],
  image: [
    {
      validator: validateImage,
      message: 'Please add an image if the question type you selected is an image-based question!'
    }
  ],
  audio: [
    {
      validator: validateAudio,
      message: 'Please add audio if the question type you selected is an audio-based question!'
    }
  ]
}

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
const beforeUploadImage = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG & PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 25
  if (!isLt2M) {
    message.error('Image must smaller than 25MB!')
  }
  return (isJpgOrPng && isLt2M) || Upload.LIST_IGNORE
}
const beforeUploadAudio = (file) => {
  const isMpeg = file.type === 'audio/mpeg'
  if (!isMpeg) {
    message.error('You can only upload MPEG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 25
  if (!isLt2M) {
    message.error('Image must smaller than 25MB!')
  }
  return (isMpeg && isLt2M) || Upload.LIST_IGNORE
}
const customPreventRequest = async (options) => {
  const { onSuccess, file } = options
  onSuccess(file)
}
const handleChangeImage = ({ file }) => {
  getBase64(file.originFileObj, (base64Url) => {
    imageInfo.value = {
      file: file.originFileObj,
      previewUrl: base64Url
    }
  })
}
const handleChangeAudio = ({ file }) => {
  if (audioInfo.value?.previewUrl) {
    URL.revokeObjectURL(audioInfo.value?.previewUrl)
  }
  audioInfo.value = {
    file: file.originFileObj,
    previewUrl: URL.createObjectURL(file?.originFileObj)
  }
  nextTick(() => {
    audioRef.value.load()
  })
}
const handleSubmitFormInModal = async () => {
  let isFailure = false
  let questionId
  try {
    submitLoading.value = true
    let data = {
      content: questionFormData.content,
      name: questionFormData.name,
      answers: JSON.stringify([
        { id: 1, content: questionFormData.answer1 },
        { id: 2, content: questionFormData.answer2 },
        { id: 3, content: questionFormData.answer3 },
        { id: 4, content: questionFormData.answer4 }
      ]),
      trueAnswer: questionFormData.trueAnswer,
      type: questionFormData.type,
      partId: questionFormData.partId,
      image: imageInfo.value?.file ? imageInfo.value?.file : null,
      audio: audioInfo.value?.file ? audioInfo.value?.file : null
    }
    let response = await commonApi.addQuestion(data)
    if (response.status === 200 && response.data.success === true) {
      // Success
      questionId = response.data?.data?.id
    } else throw new Error(response.data?.message)
  } catch (err) {
    isFailure = true
    submitLoading.value = false
    notification.error({
      message: 'An error occurred, please try again!',
      description: err.message
    })
  }

  if (isFailure) return

  try {
    let data = {
      questionId,
      testId: questionFormData.testId
    }
    let response = await commonApi.addQuestionToTest(data)
    if (response.status === 200 && response.data.success === true) {
      notification.success({
        message: 'You have successfully added a new question.'
      })
    } else throw new Error(response.data?.message)
  } catch (err) {
    isFailure = true
    notification.error({
      message: 'There was an error, and it was not possible to add the question to the test!',
      description: err.message
    })
  }

  questionFormDataRef.value.resetFields()
  imageInfo.value = { file: null, previewUrl: '' }
  audioInfo.value = { file: null, previewUrl: '' }
  submitLoading.value = false
}

getParts()
getTests()
</script>
<template>
  <div>
    <h1 class="mb-8">Add Question</h1>
    <div class="mb-8">
      <Form
        layout="vertical"
        :model="questionFormData"
        :rules="rules"
        ref="questionFormDataRef"
        @finish="handleSubmitFormInModal"
      >
        <FormItem label="Name" name="name">
          <Input
            v-model:value="questionFormData.name"
            placeholder="Enter a question description (ex: Listen and choose answer, ...)"
          />
        </FormItem>
        <div class="grid md:grid-cols-2 md:gap-4">
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
          <FormItem label="Test" name="testId" class="flex-1">
            <Select
              :options="testOptions"
              v-model:value="questionFormData.testId"
              class="w-full"
              placeholder="Enter the test"
              :loading="testsLoading"
              :disabled="!questionFormData.partId"
            >
            </Select>
          </FormItem>
        </div>
        <div class="grid md:grid-cols-2 md:gap-4">
          <FormItem label="Type" name="type" class="flex-1">
            <Select
              :options="questionTypes"
              v-model:value="questionFormData.type"
              class="w-full"
              placeholder="Enter the type"
            >
            </Select>
          </FormItem>
          <FormItem label="Content" name="content" class="flex-1">
            <Input v-model:value="questionFormData.content" placeholder="Enter question content" />
          </FormItem>
        </div>
        <div class="grid md:grid-cols-2 md:gap-4">
          <FormItem label="Image" name="image">
            <Upload
              v-model:file-list="questionFormData.image"
              name="image"
              list-type="picture-card"
              class="flex-1"
              :show-upload-list="false"
              :custom-request="customPreventRequest"
              :before-upload="beforeUploadImage"
              @change="handleChangeImage"
            >
              <div v-if="imageInfo?.file" class="w-full h-full overflow-hidden">
                <img
                  :src="imageInfo?.previewUrl"
                  alt=""
                  class="rounded-md object-cover w-full h-full"
                />
              </div>
              <div v-else>
                <PlusOutlined></PlusOutlined>
                <div class="ant-upload-text">Upload</div>
              </div>
            </Upload>
          </FormItem>
          <FormItem label="Audio" name="audio">
            <Upload
              class="flex-1"
              v-model:file-list="questionFormData.audio"
              name="audio"
              :show-upload-list="false"
              :custom-request="customPreventRequest"
              :before-upload="beforeUploadAudio"
              @change="handleChangeAudio"
              v-if="!audioInfo?.file"
            >
              <div>
                <div
                  class="h-[128px] w-[128px] border rounded-md border-dashed flex flex-col items-center justify-center border-gray-200"
                  style="background-color: rgba(0, 0, 0, 0.02)"
                >
                  <PlusOutlined></PlusOutlined>
                  <div class="ant-upload-text">Upload</div>
                </div>
              </div>
            </Upload>
            <div v-else>
              <audio controls ref="audioRef">
                <source :src="audioInfo?.previewUrl" type="audio/mpeg" />
              </audio>
            </div>
          </FormItem>
        </div>
        <FormItem label="True Answer" name="trueAnswer">
          <RadioGroup v-model:value="questionFormData.trueAnswer" class="w-full">
            <div class="px-8 pt-8 pb-4 mb-6 rounded-md bg-gray-100">
              <Radio :value="1">
                <FormItem label="Answer 1" name="answer1">
                  <Input v-model:value="questionFormData.answer1" />
                </FormItem>
              </Radio>
              <Radio :value="2">
                <FormItem label="Answer 2" name="answer2">
                  <Input v-model:value="questionFormData.answer2" />
                </FormItem>
              </Radio>
              <Radio :value="3">
                <FormItem label="Answer 3" name="answer3">
                  <Input v-model:value="questionFormData.answer3" />
                </FormItem>
              </Radio>
              <Radio :value="4">
                <FormItem label="Answer 4" name="answer4">
                  <Input v-model:value="questionFormData.answer4" />
                </FormItem>
              </Radio>
            </div>
          </RadioGroup>
        </FormItem>
        <FormItem>
          <Button type="primary" html-type="submit" :loading="submitLoading">Submit</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
