// Supports weights 200-900
import '@fontsource-variable/nunito'
// CSS
import 'ant-design-vue/dist/reset.css'
import '@/assets/css/index.css'
// Setup
import { createApp } from 'vue'
import pinia from '@/stores/pinia'
import App from './App.vue'
import DefaultLayout from './layouts/DefaultLayout.vue'
import DashboardLayout from './layouts/DashboardLayout.vue'
import LessonLayout from './layouts/LessonLayout.vue'
import router from './router'

const app = createApp(App)

app.use(pinia)
app.use(router)

app
  .component('DefaultLayout', DefaultLayout)
  .component('DashboardLayout', DashboardLayout)
  .component('LessonLayout', LessonLayout)

app.mount('#app')
