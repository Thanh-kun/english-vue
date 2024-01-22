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
  message
} from 'ant-design-vue'
import { computed, nextTick, reactive, ref } from 'vue'

// Reactive
const parts = ref([])
const partsLoading = ref(false)

const questionFormData = reactive({
  content: undefined,
  name: undefined,
  answer1: undefined,
  answer2: undefined,
  answer3: undefined,
  answer4: undefined,
  trueAnswer: undefined,
  type: 3,
  partId: undefined,
  image: undefined,
  audio: undefined
})

const submitLoading = ref(false)
const questionFormDataRef = ref()

const partItems = computed(() => {
  return parts.value.map((item) => ({ value: item.id, label: item.sub_name + ' :' + item.name }))
})
const imageInfo = ref()
const audioInfo = ref()

const chooseAnswers = [
  {
    value: 1,
    label: 'Answer 1'
  },
  {
    value: 2,
    label: 'Answer 2'
  },
  {
    value: 3,
    label: 'Answer 3'
  },
  {
    value: 4,
    label: 'Answer 4'
  }
]

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
    return Promise.reject('Please add an image when selecting the image type')
  }
  return Promise.resolve()
}
const validateAudio = async (_rule, value) => {
  if (questionFormData.type === 2 && !value) {
    return Promise.reject('Please add an audio when selecting the image audio')
  }
  return Promise.resolve()
}
const rules = {
  name: [{ required: true, message: 'Please input name!' }],
  answers: [{ required: true, message: 'Please input answers!' }],
  trueAnswer: [{ required: true, message: 'Please input trueAnswer!' }],
  type: [{ required: true, message: 'Please input type!' }],
  partId: [{ required: true, message: 'Please input part!' }],
  answer1: [{ required: true, message: 'Please input answer 1!' }],
  answer2: [{ required: true, message: 'Please input answer 2!' }],
  answer3: [{ required: true, message: 'Please input answer 3!' }],
  answer4: [{ required: true, message: 'Please input answer 4!' }],
  image: [
    { validator: validateImage, message: 'Please add an image when selecting the image type' }
  ],
  audio: [
    { validator: validateAudio, message: 'Please add an audio when selecting the audio type' }
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
const beforeUploadImage = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return (isJpgOrPng && isLt2M) || Upload.LIST_IGNORE
}
const beforeUploadAudio = (file) => {
  const isMpeg = file.type === 'audio/mpeg'
  if (!isMpeg) {
    message.error('You can only upload JPG file!')
  }
  return isMpeg || Upload.LIST_IGNORE
}
const handleChangeImage = (info) => {
  if (info.file.status !== 'uploading') {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, (base64Url) => {
      info.file.url = base64Url
      imageInfo.value = JSON.parse(JSON.stringify(info.file))
    })
  }
}
const handleChangeAudio = (info) => {
  if (info.file.status !== 'uploading') {
    // Get this url from response in real world.
    if (audioInfo.value?.url) {
      URL.revokeObjectURL(audioInfo.value.url)
    }
    info.file.url = URL.createObjectURL(info.file?.originFileObj)
    audioInfo.value = info.file
    nextTick(() => {
      document.getElementById('audio').load()
    })
  }
}
const handleSubmitFormInModal = async () => {
  try {
    // eslint-disable-next-line no-unused-vars
    let values = await questionFormDataRef.value.validateFields()
    let data = {
      content: questionFormData.content,
      name: questionFormData.name,
      answers: encodeURIComponent(
        JSON.stringify([
          { id: 1, content: questionFormData.answer1 },
          { id: 2, content: questionFormData.answer2 },
          { id: 3, content: questionFormData.answer3 },
          { id: 4, content: questionFormData.answer4 }
        ])
      ),
      trueAnswer: questionFormData.trueAnswer,
      type: questionFormData.type,
      partId: questionFormData.partId,
      image: imageInfo.value?.originFileObj,
      audio: audioInfo.value?.originFileObj
    }
    submitLoading.value = true
    let response = await commonApi.addQuestion(data)
    if (response.status === 200 && response.data.success === true) {
      notification.success({
        message: 'New question added'
      })
      questionFormDataRef.value.resetFields()
    } else throw new Error(response.data?.message)
  } catch (err) {
    notification.error({
      message: 'An error occurred, please try again!',
      description: err.message
    })
  } finally {
    submitLoading.value = false
  }
}

getParts()
</script>
<template>
  <div>
    <h1 class="mb-8">Add Question</h1>
    <div class="mb-8">
      <Form layout="vertical" :model="questionFormData" :rules="rules" ref="questionFormDataRef">
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
          <FormItem label="Type" name="type">
            <Select
              :options="questionTypes"
              v-model:value="questionFormData.type"
              class="w-full"
              placeholder="Enter the type"
            >
            </Select>
          </FormItem>
        </div>
        <FormItem label="Content" name="content">
          <Input v-model:value="questionFormData.content" placeholder="Enter question content" />
        </FormItem>
        <FormItem label="Image" name="image">
          <Upload
            v-model:file-list="questionFormData.image"
            name="image"
            list-type="picture-card"
            :show-upload-list="false"
            :before-upload="beforeUploadImage"
            @change="handleChangeImage"
          >
            <div v-if="questionFormData.image" class="w-full h-full overflow-hidden">
              <img :src="imageInfo?.url" alt="" class="rounded-md object-cover w-full h-full" />
            </div>
            <div v-else>
              <PlusOutlined></PlusOutlined>
              <div class="ant-upload-text">Upload</div>
            </div>
          </Upload>
        </FormItem>
        <FormItem label="Audio" name="audio">
          <Upload
            v-model:file-list="questionFormData.audio"
            name="audio"
            :show-upload-list="false"
            :before-upload="beforeUploadAudio"
            @change="handleChangeAudio"
          >
            <div v-if="!questionFormData.audio">
              <div
                class="h-[128px] w-[128px] border rounded-md border-dashed flex flex-col items-center justify-center border-gray-200"
                style="background-color: rgba(0, 0, 0, 0.02)"
              >
                <PlusOutlined></PlusOutlined>
                <div class="ant-upload-text">Upload</div>
              </div>
            </div>
          </Upload>
          <div v-if="questionFormData.audio">
            <audio controls autoplay id="audio">
              <source :src="audioInfo?.url" type="audio/mpeg" />
            </audio>
          </div>
        </FormItem>
        <div class="px-8 pt-8 pb-4 mb-6 rounded-md bg-gray-100">
          <FormItem label="Answer 1" name="answer1">
            <Input v-model:value="questionFormData.answer1" />
          </FormItem>
          <FormItem label="Answer 2" name="answer2">
            <Input v-model:value="questionFormData.answer2" />
          </FormItem>
          <FormItem label="Answer 3" name="answer3">
            <Input v-model:value="questionFormData.answer3" />
          </FormItem>
          <FormItem label="Answer 4" name="answer4">
            <Input v-model:value="questionFormData.answer4" />
          </FormItem>
        </div>
        <FormItem label="True Answer" name="trueAnswer">
          <Select v-model:value="questionFormData.trueAnswer" :options="chooseAnswers" />
        </FormItem>
        <FormItem>
          <Button
            @click="handleSubmitFormInModal"
            type="primary"
            html-type="submit"
            :loading="submitLoading"
            >Submit</Button
          >
        </FormItem>
      </Form>
    </div>
  </div>
</template>