<script setup>
import LessonItem from '@/components/LessonItem.vue'
import LessonBox from '@/components/LessonBox.vue'
import { commonApi } from '@/services'
import { useLesson, usePart, useTest } from '@/stores'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
let partId = route.params?.id
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

if (!(partId in lessonStore.lessons)) {
  try {
    let response = await commonApi.getLesson(partId)
    if (response.status === 200 && response.data.success === true) {
      lessonStore.setLessons(response.data.data ?? [], partId)
    }
    throw new Error()
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
    throw new Error()
  } catch (err) {
    console.log(err?.message)
  }
}
</script>
<template>
  <div style="min-height: calc(100dvh - 60px)" class="bg-primary-50 py-10">
    <div class="w-full container mx-auto">
      <div class="bg-white py-4 px-4 rounded-md mb-2 shadow border">
        <h1 class="text-2xl text-center">The TOEIC exam preparation - Listening</h1>
      </div>
      <div class="flex gap-2">
        <div class="w-3/4">
          <div class="bg-white py-4 px-4 rounded-md shadow border mb-4">
            <h2 class="text-xl font-bold mb-2">Part 1: Photos</h2>
            <LessonBox>
              <RouterLink
                :to="{ name: 'lessonItem', params: { partId, lessonId: lesson.id } }"
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
            <div class="grid gap-2 grid-cols-5">
              <div
                class="bg-white rounded-md shadow border px-4"
                v-for="test of tests"
                :key="test.id"
              >
                <div
                  class="text-3xl text-center font-black text-gray-400 py-6 border-b border-dashed border-gray-300"
                >
                  0%
                </div>
                <div class="pb-6 pt-4">
                  <div class="text-xl text-gray-800 text-center font-bold mb-4">
                    {{ test.name }}
                  </div>
                  <div class="text-center text-sm font-light">
                    {{ test.participant }} participant
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-1/4">
          <div class="bg-white py-4 px-4 rounded-md shadow border">
            <h2 class="text-xl font-bold mb-2">Other Practices</h2>
            <div class="flex flex-col">
              <RouterLink
                v-for="part of parts"
                :to="'/part/' + part.id"
                :key="part.id"
                class="block no-underline text-black p-4 border-b border-gray-300 border-dashed"
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
