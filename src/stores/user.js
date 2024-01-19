import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUser = defineStore(
  'user',
  () => {
    const userInfo = ref('')
    const accessToken = ref('')
    const isAuth = ref(false)

    function setUserInfo(userInfo) {
      accessToken.value = userInfo
    }

    function setToken(token) {
      accessToken.value = token
      isAuth.value = true
    }

    function clearToken() {
      accessToken.value = ''
      userInfo.value = ''
      isAuth.value = false
    }

    return { userInfo, accessToken, isAuth, setUserInfo, setToken, clearToken }
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
