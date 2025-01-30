import { useColorMode } from '#imports'
import type { NuxtApp } from 'nuxt/app'

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  // This plugin only runs on the client side
  if (process.client) {
    const colorMode = useColorMode()

    // Set initial color mode based on system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    colorMode.preference = prefersDark ? 'dark' : 'light'

    // Listen for system color scheme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', (e) => {
      colorMode.preference = e.matches ? 'dark' : 'light'
    })
  }
})
