<script setup>
import { commonApi } from '@/services'
import { useLesson, usePart, useTest } from '@/stores'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

// Route
const route = useRoute()
let { partId, lessonId } = route.params

// Reactive
const lessonStore = useLesson()
const partStore = usePart()
const testStore = useTest()

const lessonsInPart = computed(() => {
  return lessonStore?.lessons[partId] ?? []
})
const testsInPart = computed(() => {
  return testStore?.tests[partId] ?? []
})
const currentLesson = computed(() => {
  return lessonsInPart.value.find((item) => item.id === Number(lessonId))
})
const currentPart = computed(() => {
  return partStore.parts.find((item) => item.id === Number(partId))
})

// Methods
const getLessons = async () => {
  try {
    let response = await commonApi.getLesson(partId)
    if (response.status === 200 && response.data.success === true) {
      lessonStore.setLessons(response.data.data ?? [], partId)
    } else throw new Error()
  } catch (err) {
    console.log(err?.message)
  }
}
const getTests = async () => {
  try {
    let response = await commonApi.getTest(partId)
    if (response.status === 200 && response.data.success === true) {
      testStore.setTests(response.data.data ?? [], partId)
    } else throw new Error()
  } catch (err) {
    console.log(err?.message)
  }
}
const handleClickLesson = async (lesson) => {
  try {
    let response = await commonApi.readLesson(lesson.id)
    if (response.status === 200 && response.data.success === true) {
      getLessons();
    } else throw new Error()
  } catch (err) {
    console.error(err.message)
  }
}

// Run code
if (!(partId in lessonStore.lessons)) getLessons()
if (!(testStore.lessons && partId in testStore.lessons)) getTests()
</script>
<template>
  <div style="min-height: calc(100dvh - 60px)" class="bg-primary-50 py-10">
    <div class="w-full container mx-auto">
      <div class="flex flex-wrap -mt-20 -mx-3">
        <div class="w-full xl:w-3/4 pt-20 px-3">
          <div class="bg-white p-8 rounded-3xl border mb-2 xl:hidden">
            <h1 class="text-2xl font-bold">{{ currentPart?.sub_name }}: {{ currentPart?.name }}</h1>
          </div>
          <div class="bg-white p-8 rounded-3xl border scroll-custom overflow-auto">
            <h2 class="text-base font-bold mb-4">{{ currentLesson?.name }}</h2>
            <div class="font-sans">
              <div v-html="currentLesson?.content"></div>
            </div>
          </div>
        </div>
        <div class="w-full xl:w-1/4 pt-20 px-3">
          <div class="bg-white p-8 rounded-3xl border mb-2 xl:block hidden">
            <h1 class="text-2xl font-bold">{{ currentPart?.sub_name }}: {{ currentPart?.name }}</h1>
          </div>
          <div class="bg-white p-8 rounded-3xl border mb-2">
            <h2 class="text-xl font-bold mb-2">Lessons</h2>
            <div>
              <RouterLink
                v-for="lesson of lessonsInPart"
                :to="{ name: 'lesson', params: { partId, lessonId: lesson.id } }"
                :key="lesson.id"
                :title="lesson.name"
                class="block no-underline text-black p-4 border-b border-gray-300 border-dashed line-clamp-2"
                @click="() => handleClickLesson(lesson)"
              >
                {{ lesson.name }}
              </RouterLink>
            </div>
          </div>
          <div class="bg-white p-8 rounded-3xl border">
            <h2 class="text-xl font-bold mb-4">Practices</h2>
            <div class="flex flex-wrap -mt-2 -mx-1">
              <div class="px-1 pt-2" v-for="test of testsInPart" :key="test.id">
                <RouterLink
                  :to="{ name: 'partTest', params: { partId: partId, testId: test.id } }"
                  class="no-underline"
                >
                  <div
                    class="px-3 py-2 font-bold text-sm border rounded-xl text-center"
                    :title="test.name"
                  >
                    {{ test.name }}
                  </div>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
