<script setup>
import QuestionList from '@/components/QuestionList.vue'
import QuestionBox from '@/components/QuestionBox.vue'
import { Button, Radio, RadioGroup } from 'ant-design-vue'
import { computed, ref } from 'vue'
import { commonApi } from '@/services/index'

const START = 1
const DOING = 2
const END = 3

const questions = ref([])
const dataLoading = ref(false)
const testStatus = ref(START)

const currentQuestionIndex = ref(0)
const currentAnswer = ref()
const questionItems = computed(() => {
  return questions.value.map((item, index) => ({
    value: item.id,
    label: index + 1
  }))
})
const currentQuestion = computed(() => {
  console.log(currentQuestionIndex.value)
  return questions.value[currentQuestionIndex.value] ?? {}
})
const isStartButtonLoading = computed(() => {
  return dataLoading.value && testStatus.value === DOING
})

const getTestData = async () => {
  try {
    dataLoading.value = true
    let response = await commonApi.getMiniTest({ partId: 1, limit: 50 })
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
  testStatus.value = DOING
}
const handleReset = () => {
  testStatus.value = START
}
</script>
<template>
  <div style="min-height: calc(100dvh - 60px)" class="bg-primary-50 py-10">
    <div class="container mx-auto">
      <div class="flex flex-wrap -mt-3 -mx-3">
        <div class="pt-3 px-3 w-full flex-1">
          <div class="bg-white p-8 rounded-3xl mt-11 border min-h-60">
            <div v-if="testStatus === START">
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
            <div v-if="testStatus === DOING && !isStartButtonLoading">
              <div class="font-bold text-base mb-8">Question {{ currentQuestionIndex + 1 }}:</div>
              <div class="flex justify-center mb-4">
                <audio controls>
                  <source :src="currentQuestion.question?.audio" type="audio/mpeg" />
                </audio>
              </div>
              <div class="mb-4">
                <img
                  :src="currentQuestion?.question.image"
                  alt=""
                  class="w-4/5 mx-auto rounded border shadow"
                />
              </div>
              <div class="mt-4">
                <RadioGroup v-model:value="currentAnswer">
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
                <Button>Prev</Button>
                <Button type="primary">Next</Button>
              </div>
            </div>
            <div v-if="testStatus === END">
              <img src="@/assets/images/start.svg" class="w-4/5 mx-auto h-full" />
              <div class="text-center my-8">
                <Button class="min-w-40" @click="handleReset">Reset</Button>
              </div>
            </div>
          </div>
        </div>
        <div class="pt-3 px-3 w-full lg:w-[318px] xl:w-[362px]">
          <QuestionBox>
            <template #header> Mini Test </template>
            <template #body>
              <QuestionList :items="questionItems" :selectedItem="currentQuestion + 1" />
            </template>
            <template #footer>
              <div class="font-bold text-sm text-end">100 questions</div>
            </template>
          </QuestionBox>
        </div>
      </div>
    </div>
  </div>
</template>
