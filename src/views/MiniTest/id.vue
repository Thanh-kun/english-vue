<script setup>
import QuestionList from '@/components/QuestionList.vue'
import QuestionBox from '@/components/QuestionBox.vue'
import { Button, Radio, RadioGroup, Image } from 'ant-design-vue'
import { computed, ref } from 'vue'
import { commonApi } from '@/services/index'
import { STATUS } from '@/constant/index'
import { useRoute } from 'vue-router'

const route = useRoute()
const partId = route.params.partId
const questions = ref([])
const dataLoading = ref(false)
const testStatus = ref(STATUS.START)

const currentQuestionIndex = ref(0)
const listAnswer = ref({})
const listTrueAnswer = ref([])
const listTrueAnswerCheck = ref({})
const resultTest = ref({
  not_answer: 0,
  true: 0,
  false: 0
})
const questionIds = computed(() => {
  return questions.value.map((item) => item.id)
})
const questionItems = computed(() => {
  return questions.value.map((item, index) => ({
    value: index + 1,
    label: index + 1,
    id: item.id
  }))
})
const currentQuestion = computed(() => {
  return questions.value[currentQuestionIndex.value] ?? {}
})
const isStartButtonLoading = computed(() => {
  return dataLoading.value && testStatus.value === STATUS.DOING
})

const getTestData = async () => {
  try {
    dataLoading.value = true
    let response = await commonApi.getMiniTest({ partId, limit: 30 })
    if (response.status === 200 && response.data.success === true) {
      questions.value = response.data?.data ?? []
    }
  } catch (err) {
    console.log(err)
  } finally {
    dataLoading.value = false
  }
}

getTestData()

const handleStarted = () => {
  testStatus.value = STATUS.DOING
}
const handleReset = async () => {
  await getTestData()
  listAnswer.value = {}
  listTrueAnswer.value = []
  listTrueAnswerCheck.value = {}
  resultTest.value = {
    not_answer: 0,
    true: 0,
    false: 0
  }
  currentQuestionIndex.value = 0
  testStatus.value = STATUS.START
}

const handleNext = () => {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value += 1
  }

  // if (currentQuestionIndex.value >= questionItems.value.length - 7) {
  //   testStatus.value = STATUS.END
  // }
}

const handleClickItem = (value) => {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value = value - 1
  }
}

const handlePrev = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
  }
}

const handleSubmit = async () => {
  try {
    console.log(listAnswer)
    let response = await commonApi.getAnswerByIds(questionIds.value)

    if (response.status === 200 && response.data.success === true) {
      listTrueAnswer.value = response.data?.data
      resultTest.value.not_answer = questions.value.length - Object.keys(listAnswer.value).length
      listTrueAnswer.value.forEach((trueAnswer) => {
        listTrueAnswerCheck.value[trueAnswer.question_id] = trueAnswer.true_answer
        if (listAnswer.value[trueAnswer.question_id] == trueAnswer.true_answer) {
          resultTest.value.true++
        }
      })
      resultTest.value.false =
        questions.value.length - resultTest.value.not_answer - resultTest.value.true
      testStatus.value = STATUS.END
      currentQuestion.value = {}
      currentQuestionIndex.value = -1
    }
  } catch (err) {
    console.log(err)
  } finally {
    dataLoading.value = false
  }
}

const handleChangeAnswer = (e) => {
  listAnswer.value[currentQuestion.value.id] = e.target.value
}
</script>
<template>
  <div style="min-height: calc(100dvh - 60px)" class="bg-primary-50 py-10">
    <div class="container mx-auto">
      <div class="flex flex-wrap -mt-3 -mx-3">
        <div class="pt-3 px-3 w-full flex-1">
          <div class="bg-white p-8 rounded-3xl mt-11 border min-h-60">
            <div v-if="testStatus === STATUS.START || isStartButtonLoading">
              <h2 class="text-center mb-2 font-bold">Are you ready?</h2>
              <img src="@/assets/images/start.svg" class="w-4/5 mx-auto h-full" />
              <div class="text-center my-8">
                <Button
                  class="min-w-40"
                  type="primary"
                  @click="handleStarted"
                  :loading="isStartButtonLoading"
                  >Start</Button
                >
              </div>
            </div>
            <div v-if="testStatus === STATUS.DOING && !isStartButtonLoading">
              <div class="font-bold text-base mb-8">Question {{ currentQuestionIndex + 1 }}:</div>
              <div class="flex justify-center mb-4">
                <audio controls>
                  <source :src="currentQuestion.question?.audio" type="audio/mpeg" />
                </audio>
              </div>
              <div
                class="w-4/5 mx-auto rounded border shadow mb-4 min-h-40 flex"
                v-if="currentQuestion?.question.image"
              >
                <Image
                  :src="currentQuestion?.question.image"
                  fallback="data:image/png;base64,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"
                  alt=""
                  height="100%"
                  width="100%"
                />
              </div>
              <div class="mt-4">
                <RadioGroup
                  v-model:value="listAnswer[currentQuestion.id]"
                  @change="handleChangeAnswer"
                >
                  <div
                    v-for="answer of currentQuestion.answers"
                    :key="answer.id"
                    class="block mb-2"
                  >
                    <Radio :value="answer.id">{{ answer.content }}</Radio>
                  </div>
                </RadioGroup>
              </div>
              <div class="flex justify-between mt-8">
                <Button :disabled="currentQuestionIndex == 0" @click="handlePrev">Prev</Button>
                <Button
                  :disabled="currentQuestionIndex == questions.length - 1"
                  type="primary"
                  @click="handleNext"
                  >Next</Button
                >
              </div>
            </div>
            <div v-if="testStatus === STATUS.END">
              <div v-for="(question, index) of questions" :key="index">
                <div class="font-bold text-base mb-8">Question {{ index + 1 }}:</div>
                <div class="flex justify-center mb-4">
                  <audio controls>
                    <source :src="question.question?.audio" type="audio/mpeg" />
                  </audio>
                </div>
                <div
                  class="w-4/5 mx-auto rounded border shadow mb-4 min-h-40 flex"
                  v-if="question?.question.image"
                >
                  <Image
                    :src="question?.question.image"
                    fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
                    alt=""
                    height="100%"
                    width="100%"
                  />
                </div>
                <div class="mt-4">
                  <RadioGroup v-model:value="listAnswer[question.id]">
                    <div v-for="answer of question.answers" :key="answer.id" class="block mb-2">
                      <Radio
                        :value="answer.id"
                        :disabled="true"
                        :style="{
                          backgroundColor:
                            listTrueAnswerCheck?.[question.id] == answer.id
                              ? 'rgb(167,243,208)'
                              : ''
                        }"
                      >
                        {{ answer.content }}
                      </Radio>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div class="text-center my-8">
                <Button class="min-w-40" @click="handleReset">Restart</Button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="testStatus == STATUS.DOING" class="pt-3 px-3 w-full lg:w-[318px] xl:w-[362px]">
          <QuestionBox>
            <template #header> Mini Test </template>
            <template #body>
              <QuestionList
                :listAnswer="listAnswer"
                :items="questionItems"
                :selectedItem="testStatus == STATUS.DOING ? currentQuestionIndex + 1 : 0"
              />
              <!-- @select="handleClickItem" -->
            </template>
            <template #footer>
              <div class="flex items-center justify-between">
                <div class="font-bold text-sm text-end">{{ questionItems.length }} questions</div>
                <div div class="font-bold text-sm text-start">
                  <Button @click="handleSubmit" type="primary">Submit</Button>
                </div>
              </div>
            </template>
          </QuestionBox>
        </div>

        <div v-if="testStatus == STATUS.END" class="mt-14 w-full lg:w-[318px] xl:w-[362px]">
          <div class="border py-6 px-8 bg-gray-100 rounded-xl">
            <div>Don't get frustrated, keep practicing and you can get 100% too!</div>
            <div class="flex flex-col">
              <div class="mt-4 flex p-2 bg-white rounded-lg">
                <div
                  class="flex-1 font-medium text-center text-green-400 border-r border-black-900"
                >
                  Correct
                </div>
                <div class="flex-1 font-bold text-center">{{ resultTest.true }}</div>
              </div>
              <div class="mt-4 flex p-2 bg-white rounded-lg">
                <div class="flex-1 font-medium text-center text-red-400 border-r border-black-900">
                  Incorrect
                </div>
                <div class="flex-1 font-bold text-center">{{ resultTest.false }}</div>
              </div>
              <div class="mt-4 flex p-2 bg-white rounded-lg">
                <div
                  class="flex-1 font-medium text-center text-yellow-400 border-r border-black-900"
                >
                  New
                </div>
                <div class="flex-1 font-bold text-center">{{ resultTest.not_answer }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
