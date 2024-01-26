<script setup>
import QuestionList from '@/components/QuestionList.vue'
import QuestionBox from '@/components/QuestionBox.vue'
import { Button, Radio, RadioGroup, Image } from 'ant-design-vue'
import { computed, ref, watch } from 'vue'
import { commonApi } from '@/services/index'
import { STATUS } from '@/constant/index'
import { useRoute } from 'vue-router'

// Route
const route = useRoute()
const { partId } = route.params

// Reactive
const questions = ref([])
const questionsLoading = ref(false)

const testStatus = ref(STATUS.START)

const currentQuestionIndex = ref(0)

const answers = ref([])
const answersObj = ref({})
const answersLoading = ref(false)
const chooseAnswers = ref({})
const currentChooseAnswer = ref()

const resultTest = ref({
  correct: 0,
  incorrect: 0,
  notDone: 0
})

const questionIds = computed(() => {
  return questions.value.map((item) => item.id)
})
const questionItems = computed(() => {
  return questions.value.map((item, index) => ({
    value: item.id,
    label: index + 1,
    isSuccess:
      answers.value?.length > 0 && chooseAnswers.value[item.id]?.answerId
        ? chooseAnswers.value[item.id].answerId === answersObj.value[item.id]
        : false,
    isFailure:
      answers.value?.length > 0 && chooseAnswers.value[item.id]?.answerId
        ? chooseAnswers.value[item.id].answerId !== answersObj.value[item.id]
        : false,
    isDone: Boolean(chooseAnswers.value[item.id]?.answerId)
  }))
})

const currentQuestion = computed(() => {
  return questions.value[currentQuestionIndex.value] ?? {}
})
watch(currentChooseAnswer, () => {
  if (currentChooseAnswer.value !== undefined) {
    if (chooseAnswers.value[currentQuestion.value.id]) {
      chooseAnswers.value[currentQuestion.value.id].answerId = currentChooseAnswer.value
    } else {
      chooseAnswers.value[currentQuestion.value.id] = {
        questionId: currentQuestion.value.id,
        answerId: currentChooseAnswer.value
      }
    }
  }
})

// Methods
const getTestData = async () => {
  try {
    questionsLoading.value = true
    let response = await commonApi.getMiniTest({ partId, limit: 30 })
    if (response.status === 200 && response.data.success === true) {
      questions.value = response.data?.data ?? []
    }
  } catch (err) {
    console.log(err)
  } finally {
    questionsLoading.value = false
  }
}
const handleSubmit = async () => {
  try {
    answersLoading.value = true
    let response = await commonApi.getAnswerByIds(questionIds.value)

    if (response.status === 200 && response.data.success === true) {
      answers.value = response.data?.data ?? []
      resultTest.value.notDone = questions.value.length - Object.keys(chooseAnswers.value).length
      answers.value.forEach((trueAnswer) => {
        answersObj.value[trueAnswer.question_id] = trueAnswer.true_answer
        if (chooseAnswers.value[trueAnswer.question_id]?.answerId == trueAnswer.true_answer) {
          ++resultTest.value.correct
        }
      })
      resultTest.value.incorrect =
        questions.value.length - resultTest.value.notDone - resultTest.value.correct
      testStatus.value = STATUS.END
      currentChooseAnswer.value = undefined
      currentQuestionIndex.value = -1
    }
  } catch (err) {
    console.log(err)
  } finally {
    answersLoading.value = false
  }
}
const handleStarted = () => {
  testStatus.value = STATUS.DOING
}
const handleReset = async () => {
  await getTestData()
  currentChooseAnswer.value = null
  currentQuestionIndex.value = 0
  answers.value = []
  answersObj.value = {}
  resultTest.value = {
    correct: 0,
    incorrect: 0,
    notDone: 0
  }
  testStatus.value = STATUS.START
}
const handleNext = async () => {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    ++currentQuestionIndex.value
    currentChooseAnswer.value = chooseAnswers.value[currentQuestion.value.id]?.answerId
  } else if (currentQuestionIndex.value === questions.value.length - 1) {
    await handleSubmit()
  }
}
const handlePrev = () => {
  if (currentQuestionIndex.value > 0) {
    --currentQuestionIndex.value
    currentChooseAnswer.value = chooseAnswers.value[currentQuestion.value.id]?.answerId
  }
}
const handleClickItem = (id) => {
  const index = questions.value.findIndex((item) => item.id === id)
  currentQuestionIndex.value = index
  currentChooseAnswer.value = chooseAnswers.value[currentQuestion.value.id]?.answerId
}
const handleRadioChange = () => {
  // console.log(chooseAnswers.value)
}
const handleSelect = (id) => {
  let position = Math.max(document.getElementById('item-' + id).getBoundingClientRect().top - 80, 0)
  window.scroll({
    top: position,
    behavior: 'smooth'
  })
}

// Run code
getTestData()
</script>
<template>
  <div style="min-height: calc(100dvh - 60px)" class="bg-primary-50 py-10">
    <div class="container mx-auto">
      <div class="flex flex-wrap -mt-3 -mx-3">
        <div class="pt-3 px-3 w-full flex-1">
          <div class="bg-white p-8 rounded-3xl border min-h-60" v-if="testStatus !== STATUS.END">
            <div v-if="testStatus === STATUS.START || questionsLoading">
              <h2 class="text-center mb-2 font-bold">Are you ready?</h2>
              <img src="@/assets/images/start.svg" class="w-4/5 mx-auto h-full max-h-[50dvh]" />
              <div class="text-center my-8">
                <Button
                  class="min-w-40"
                  type="primary"
                  @click="handleStarted"
                  :loading="testStatus !== STATUS.START && questionsLoading"
                  >Start</Button
                >
              </div>
            </div>
            <div v-if="testStatus === STATUS.DOING && !questionsLoading">
              <div class="font-bold text-base mb-8">
                Question {{ currentQuestionIndex + 1 }}: {{ currentQuestion?.name }}
              </div>
              <div class="flex justify-center mb-4" v-if="currentQuestion?.question?.audio">
                <audio controls>
                  <source :src="currentQuestion.question?.audio" type="audio/mpeg" />
                </audio>
              </div>
              <div
                class="w-fit max-h-[50dvh] mx-auto rounded border shadow mb-4 min-h-40 min-w-40 flex"
                v-if="currentQuestion?.question?.image"
              >
                <Image
                  :src="currentQuestion?.question.image"
                  fallback="data:image/png;base64,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"
                  alt=""
                  class="w-fit mx-auto h-full object-cover"
                />
              </div>
              <div class="flex justify-center mb-4" v-if="currentQuestion.question?.content">
                <div v-html="currentQuestion.question?.content"></div>
              </div>
              <div class="mt-4">
                <RadioGroup v-model:value="currentChooseAnswer" @change="handleRadioChange">
                  <div
                    v-for="answer of currentQuestion.answers"
                    :key="answer.id"
                    class="block mb-2"
                  >
                    <Radio :value="answer.id">{{ answer.content }}</Radio>
                  </div>
                </RadioGroup>
              </div>
              <div class="flex items-end mt-8">
                <Button type="primary" @click="handlePrev" :disabled="currentQuestionIndex <= 0">
                  Prev
                </Button>
                <Button
                  type="primary"
                  @click="handleNext"
                  class="ml-auto"
                  :loading="answersLoading"
                >
                  <span v-if="currentQuestionIndex < questions.length - 1">Next</span>
                  <span v-else>Submit</span>
                </Button>
              </div>
            </div>
          </div>
          <div
            v-if="testStatus === STATUS.END"
            class="space-y-8 bg-white p-8 rounded-3xl border min-h-60"
          >
            <div
              v-for="(question, index) of questions"
              :key="question.id"
              :id="`item-${question.id}`"
            >
              <div class="font-bold text-base mb-8">
                Question {{ index + 1 }}: {{ question?.name }}
              </div>
              <div class="flex justify-center mb-4" v-if="question?.question?.audio">
                <audio controls>
                  <source :src="question.question?.audio" type="audio/mpeg" />
                </audio>
              </div>
              <div
                class="w-fit max-h-[50dvh] mx-auto rounded border shadow mb-4 min-h-40 min-w-40 flex"
                v-if="question?.question?.image"
              >
                <Image
                  :src="question?.question.image"
                  fallback="data:image/png;base64,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"
                  alt=""
                  class="w-fit mx-auto h-full object-cover"
                />
              </div>
              <div class="flex justify-center mb-4" v-if="question.question?.content">
                <div v-html="question.question?.content"></div>
              </div>
              <div class="mt-4">
                <RadioGroup
                  :value="chooseAnswers[question.id]?.answerId"
                  @change="handleRadioChange"
                  class="pointer-events-none"
                >
                  <div v-for="answer of question.answers" :key="answer.id" class="block mb-2">
                    <Radio
                      :value="answer.id"
                      :class="{
                        'bg-green-100': answer.id === answersObj[question.id],
                        'bg-red-100': answer.id !== answersObj[question.id]
                      }"
                      >{{ answer.content }}</Radio
                    >
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>
        <div class="pt-3 px-3 w-full lg:w-[318px] xl:w-[362px]" v-if="testStatus !== STATUS.START">
          <div class="mb-12">
            <QuestionBox v-if="testStatus === STATUS.DOING">
              <template #header> Mini Test </template>
              <template #body>
                <QuestionList
                  :listAnswer="chooseAnswers"
                  :items="questionItems"
                  :selectedItem="testStatus === STATUS.END ? null : currentQuestion.id"
                  @select="handleClickItem"
                />
              </template>
              <template #footer>
                <div class="font-bold text-sm text-end">{{ questionItems.length }} questions</div>
              </template>
            </QuestionBox>
            <QuestionBox v-if="testStatus === STATUS.END">
              <template #header> Mini Test </template>
              <template #body>
                <QuestionList
                  :listAnswer="chooseAnswers"
                  :items="questionItems"
                  :selectedItem="null"
                  @select="handleSelect"
                />
              </template>
              <template #footer>
                <div class="font-bold text-sm text-end">{{ questionItems.length }} questions</div>
              </template>
            </QuestionBox>
          </div>
          <div class="border py-6 px-8 bg-gray-100 rounded-xl" v-if="testStatus === STATUS.END">
            <div>Don't get frustrated, keep practicing and you can get 100% too!</div>
            <div class="flex flex-col">
              <div class="mt-4 flex p-2 bg-white rounded-lg">
                <div
                  class="flex-1 font-medium text-center text-green-400 border-r border-black-900"
                >
                  Correct
                </div>
                <div class="flex-1 font-bold text-center">{{ resultTest.correct }}</div>
              </div>
              <div class="mt-4 flex p-2 bg-white rounded-lg">
                <div class="flex-1 font-medium text-center text-red-400 border-r border-black-900">
                  Incorrect
                </div>
                <div class="flex-1 font-bold text-center">{{ resultTest.incorrect }}</div>
              </div>
              <div class="mt-4 flex p-2 bg-white rounded-lg mb-8">
                <div
                  class="flex-1 font-medium text-center text-yellow-400 border-r border-black-900"
                >
                  Not Done
                </div>
                <div class="flex-1 font-bold text-center">{{ resultTest.notDone }}</div>
              </div>
              <Button @click="handleReset" type="primary">Reset</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
