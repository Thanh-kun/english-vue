<script setup>
import QuestionList from '@/components/QuestionList.vue'
import QuestionBox from '@/components/QuestionBox.vue'
import { Button, Radio, RadioGroup, Image } from 'ant-design-vue'
import { computed, ref, watch } from 'vue'
import { commonApi } from '@/services/index'
import { STATUS } from '@/constant/index'
import { useTest } from '@/stores'
import { useRoute } from 'vue-router'

const route = useRoute()
let partId = route.params?.partId
let testId = route.params?.testId

const testStore = useTest()

const questions = ref([])
const testStatus = ref(STATUS.START)

const isQuestionsLoading = ref(false)
const isAnswersLoading = ref(false)

const isShowAnswer = ref(false)

const currentQuestionIndex = ref(0)
const currentQuestion = computed(() => {
  console.log(questions.value[currentQuestionIndex.value])
  return questions.value[currentQuestionIndex.value] ?? {}
})
const questionOptions = computed(() => {
  return questions.value.map((item, index) => ({
    value: item.id,
    label: index + 1
  }))
})

const testItem = computed(() => {
  return testStore.tests[partId]
    ? testStore.tests[partId].find((item) => item.id === Number(testId))
    : ''
})

const chooseAnswers = ref({})
const answers = ref([])
const currentChooseAnswer = ref()
const currentAnswer = computed(() => {
  let answer = answers.value.find(
    (item) =>
      item.question_id === currentQuestion.value.id || item.questionId === currentQuestion.value.id
  )
  let answerItem = currentQuestion.value.answers.find(
    (item) => item.id === answer.true_answer || item.id === answer.answerId
  )
  return answerItem
})
const correctQuestion = ref(0)
const incorrectQuestion = ref(0)

watch(currentChooseAnswer, () => {
  if (currentChooseAnswer.value !== undefined) {
    if (chooseAnswers.value[currentQuestionIndex]) {
      chooseAnswers.value[currentQuestionIndex.value].answerId = currentChooseAnswer.value
    } else {
      chooseAnswers.value[currentQuestionIndex.value] = {
        questionId: currentQuestion.value.id,
        answerId: currentChooseAnswer.value
      }
    }
  }
})

const isStartButtonLoading = computed(() => {
  return isQuestionsLoading.value && testStatus.value === STATUS.DOING
})

const getTestData = async () => {
  try {
    isQuestionsLoading.value = true
    let response = await commonApi.getTestById(testId)
    if (response.status === 200 && response.data.success === true) {
      questions.value = response.data?.data?.questions ?? []
    } else {
      throw new Error()
    }
  } catch (err) {
    console.log(err)
  } finally {
    isQuestionsLoading.value = false
  }

  try {
    isAnswersLoading.value = true
    let ids = questions.value.map((item) => item.id)
    let response = await commonApi.getAnswerByIds(ids)
    if (response.status === 200 && response.data.success === true) {
      answers.value = response.data?.data ?? []
    } else {
      throw new Error()
    }
  } catch (err) {
    console.log(err)
  } finally {
    isAnswersLoading.value = false
  }
}
getTestData()

const handleStarted = () => {
  currentQuestionIndex.value = 0
  currentChooseAnswer.value = undefined

  testStatus.value = STATUS.DOING
}

const handleReset = () => {
  currentQuestionIndex.value = 0
  currentChooseAnswer.value = undefined
  correctQuestion.value = 0
  incorrectQuestion.value = 0

  testStatus.value = STATUS.START
}

const handleNext = () => {
  if (currentQuestionIndex.value >= questionOptions.value.length - 1) {
    testStatus.value = STATUS.END
  } else {
    currentQuestionIndex.value += 1
    currentChooseAnswer.value = chooseAnswers.value[currentQuestionIndex.value]?.answerId
    isShowAnswer.value = false
  }
}

const handlePrev = () => {
  if (currentQuestionIndex.value <= 0) return

  currentQuestionIndex.value -= 1
  currentChooseAnswer.value = chooseAnswers.value[currentQuestionIndex.value]?.answerId
}

const handleRadioChange = () => {
  if (currentAnswer.value !== undefined) {
    if (currentAnswer.value.id === currentChooseAnswer.value) {
      correctQuestion.value += 1
    } else incorrectQuestion.value += 1
    isShowAnswer.value = true
  }
}

if (!(partId in testStore.tests)) {
  try {
    let response = await commonApi.getTest(partId)
    if (response.status === 200 && response.data.success === true) {
      testStore.setTests(response.data.data ?? [], partId)
    } else throw new Error()
  } catch (err) {
    console.log(err?.message)
  }
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
            <div v-if="testStatus === STATUS.DOING && !isQuestionsLoading">
              <div class="font-bold text-base mb-8">Question {{ currentQuestionIndex + 1 }}:</div>
              <div class="flex justify-center mb-4" v-if="currentQuestion?.question?.audio">
                <audio controls>
                  <source :src="currentQuestion.question?.audio" type="audio/mpeg" />
                </audio>
              </div>
              <div
                class="w-4/5 mx-auto rounded border shadow mb-4 min-h-40 flex"
                v-if="currentQuestion?.question?.image"
              >
                <Image
                  :src="currentQuestion?.question.image"
                  fallback="data:image/png;base64,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"
                  alt=""
                  height="100%"
                  width="100%"
                />
              </div>
              <div class="flex justify-center mb-4" v-if="currentQuestion.question?.content">
                <div v-html="currentQuestion.question?.content"></div>
              </div>
              <div class="mt-4">
                <RadioGroup
                  v-model:value="currentChooseAnswer"
                  @change="handleRadioChange"
                  :disabled="currentChooseAnswer !== undefined"
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
              <div v-if="isShowAnswer">
                <div class="text-green-600">{{ currentAnswer.content }}</div>
              </div>
              <div class="flex justify-between mt-8">
                <Button @click="handlePrev" disabled>Prev</Button>
                <Button
                  type="primary"
                  @click="handleNext"
                  :loading="isAnswersLoading && currentChooseAnswer !== undefined"
                  :disabled="currentChooseAnswer === undefined || isAnswersLoading"
                  >Next</Button
                >
              </div>
            </div>
            <div v-if="testStatus === STATUS.END">
              <img src="@/assets/images/end.svg" class="w-4/5 mx-auto h-full" />
              <div class="my-8 flex gap-4 justify-center">
                <div class="text-green-500 font-bold">
                  Correct: {{ correctQuestion }} / {{ questions.length }}
                </div>
                |
                <div class="text-red-500 font-bold">
                  Incorrect: {{ incorrectQuestion }} / {{ questions.length }}
                </div>
              </div>
              <div class="text-center my-8">
                <Button class="min-w-40" @click="handleReset">Reset</Button>
              </div>
            </div>
          </div>
        </div>
        <div class="pt-3 px-3 w-full lg:w-[318px] xl:w-[362px]">
          <QuestionBox>
            <template #header> {{ testItem.name }} </template>
            <template #body>
              <QuestionList :items="questionOptions" :selectedItem="currentQuestion.id" />
            </template>
            <template #footer>
              <div class="flex items-start justify-between">
                <ul class="list-disc">
                  <li class="text-green-500 text-sm font-bold">Correct: {{ correctQuestion }}</li>
                  <li class="text-red-500 text-sm font-bold">Incorrect: {{ incorrectQuestion }}</li>
                </ul>
                <div class="font-bold text-sm text-end">{{ questionOptions.length }} questions</div>
              </div>
            </template>
          </QuestionBox>
        </div>
      </div>
    </div>
  </div>
</template>
