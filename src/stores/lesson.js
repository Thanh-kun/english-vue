import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLesson = defineStore('lesson', () => {
  const lessons = ref({})

  const setLessons = (newLessons, partId) => {
    lessons.value[partId] = newLessons
  }

  return { lessons, setLessons }
})
