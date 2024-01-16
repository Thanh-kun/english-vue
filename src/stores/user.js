import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUser = defineStore(
  'user',
  () => {
    const userInfo = ref('')
    const accessToken = ref('')

    function setUserInfo(userInfo) {
      accessToken.value = userInfo
    }

    function setToken(token) {
      accessToken.value = token
    }

    function clearToken() {
      accessToken.value = ''
      userInfo.value = ''
    }

    return { userInfo, accessToken, setUserInfo, setToken, clearToken }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'user',
          storage: localStorage
        }
      ]
    }
  }
)
