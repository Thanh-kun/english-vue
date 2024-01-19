import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTest = defineStore('test', () => {
  const tests = ref({})

  const setTests = (newTests, partId) => {
    tests.value[partId] = newTests
  }

  return { tests, setTests }
})
