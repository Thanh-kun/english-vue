import router from '@/router'
import axios from 'axios'

const mainHost = axios.create({
  baseURL: import.meta.env.VITE_HOST,
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
})

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    if (error.status === 401) {
      router.push('/login')
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default mainHost
