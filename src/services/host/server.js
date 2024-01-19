import router from '@/router'
import axios from 'axios'
import { useUser } from '@/stores'

const mainHost = axios.create({
  baseURL: import.meta.env.VITE_HOST
})

// Add a request interceptor
mainHost.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const userStore = useUser()
    if (userStore.accessToken) {
      config.headers.Authorization = 'Bearer ' + userStore.accessToken
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
mainHost.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    if (error?.response?.status === 401) {
      const userStore = useUser()
      userStore.clearToken()
      router.push('/sign-in')
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default mainHost
