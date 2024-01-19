// Supports weights 200-900
import '@fontsource-variable/nunito'
// CSS
import 'ant-design-vue/dist/reset.css'
import '@/assets/css/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import DefaultLayout from './layouts/DefaultLayout.vue'
import DashboardLayout from './layouts/DashboardLayout.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('DefaultLayout', DefaultLayout).component('DashboardLayout', DashboardLayout)

app.mount('#app')
