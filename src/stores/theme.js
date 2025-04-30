import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref('blue-theme')
  function changeTheme(newTheme) {
    theme.value = newTheme
    console.log('Theme changed to', newTheme)
  }
  return { theme, changeTheme }
})