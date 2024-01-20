<script setup>
import LessonItem from '@/components/LessonItem.vue'
import LessonBox from '@/components/LessonBox.vue'
import { commonApi } from '@/services'
import { useLesson, usePart, useTest } from '@/stores'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
let partId = route.params?.partId

const lessonStore = useLesson()
const testStore = useTest()
const partStore = usePart()

const parts = computed(() => {
  return partStore.parts
})
const lessons = computed(() => {
  return lessonStore?.lessons[partId] ?? []
})
const tests = computed(() => {
  return testStore?.tests[partId] ?? []
})
const partItem = computed(() => {
  return partStore.parts.find((item) => item.id === Number(partId))
})
const isListening = computed(() => {
  return partStore.listeningParts.findIndex((item) => item.id === Number(partId)) >= 0
})

if (!(partId in lessonStore.lessons)) {
  try {
    let response = await commonApi.getLesson(partId)
    if (response.status === 200 && response.data.success === true) {
      lessonStore.setLessons(response.data.data ?? [], partId)
    }
    else throw new Error()
  } catch (err) {
    console.log(err?.message)
  }
}

if (!(partId in testStore.tests)) {
  try {
    let response = await commonApi.getTest(partId)
    if (response.status === 200 && response.data.success === true) {
      testStore.setTests(response.data.data ?? [], partId)
    }
    else throw new Error()
  } catch (err) {
    console.log(err?.message)
  }
}
</script>
<template>
  <div style="min-height: calc(100dvh - 60px)" class="bg-primary-50 py-10">
    <div class="w-full container mx-auto">
      <div class="bg-white p-8 rounded-3xl mb-2 border">
        <h1 class="text-2xl text-center" v-if="isListening">The TOEIC exam preparation - Listening </h1>
        <h1 class="text-2xl text-center" v-else>The TOEIC exam preparation - Listening</h1>
      </div>
      <div class="flex flex-wrap -mt-6 -mx-3">
        <div class="w-full xl:w-3/4 pt-6 px-3">
          <div class="bg-white p-6 rounded-3xl border mb-3">
            <h2 class="text-xl font-bold mb-4">{{ partItem.sub_name }}: {{ partItem.name }}</h2>
            <LessonBox>
              <RouterLink
                :to="{ name: 'lesson', params: { partId, lessonId: lesson.id } }"
                v-for="lesson of lessons"
                :key="lesson.id"
                class="no-underline"
              >
                <LessonItem>
                  {{ lesson.name }}
                </LessonItem>
              </RouterLink>
            </LessonBox>
          </div>
          <div>
            <div class="grid gap-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <RouterLink v-for="test of tests" :key="test.id" :to="{ name: 'partTest', params: { partId: partId, testId: test.id } }" class="no-underline text-black">
                <div
                  class="bg-white px-8 rounded-3xl border transition hover:shadow-xl"
                >
                  <div
                    class="text-3xl text-center font-black text-gray-400 py-6 border-b border-dashed border-gray-300"
                  >
                    0%
                  </div>
                  <div class="pb-6 pt-4">
                    <div class="text-xl text-gray-800 text-center font-bold mb-4 text-nowrap overflow-hidden text-ellipsis" :title="test.name">
                      {{ test.name }}
                    </div>
                    <div class="text-center text-sm font-light text-nowrap overflow-hidden text-ellipsis" :title="`${test.participant} participant`">
                      {{ test.participant }} participant
                    </div>
                  </div>
                </div>
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="w-full xl:w-1/4 pt-6 px-3">
          <div class="bg-white p-8 rounded-3xl border">
            <h2 class="text-xl font-bold mb-2">Other Practices</h2>
            <div class="flex flex-col">
              <RouterLink
                v-for="part of parts"
                :to="'/part/' + part.id"
                :key="part.id"
                class="block no-underline text-black p-4 border-b border-gray-300 border-dashed line-clamp-2"
              >
                {{ part.sub_name }}: {{ part.name }}
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
