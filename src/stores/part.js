import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { LISTENING, READING } from '@/constant/common'
import { commonApi } from '@/services/index'

export const usePart = defineStore('part', () => {
  const parts = ref([])

  const listeningParts = computed(() => {
    return parts.value.filter((item) => item.type === LISTENING)
  })

  const readingParts = computed(() => {
    return parts.value.filter((item) => item.type === READING)
  })

  const getPartsFromServer = async () => {
    try {
      let response = await commonApi.getPart()
      if (response.status === 200 && response.data.success) {
        parts.value = response.data?.data ?? []
      }
    } catch (err) {
      console.log(err)
    }
  }

  const setPart = (newParts) => {
    parts.value = newParts
  }

  return { parts, listeningParts, readingParts, getPartsFromServer, setPart }
})
