import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTheme = defineStore(
  'theme',
  () => {
    const collapsedMenu = ref(false)

    function toggleMenu() {
      collapsedMenu.value = !collapsedMenu.value
    }

    return { collapsedMenu, toggleMenu }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'theme',
          storage: localStorage,
          paths: ['collapsedMenu']
        }
      ]
    }
  }
)
