<template>
  <NuxtLayout>
    <div class="app-wrapper bg-white dark:bg-[#0F1729]">
      <ClientOnly>
        <template v-if="!isAdminOrAuthRoute">
          <Ticker />
          <Header @menu-toggle="handleMenuToggle" />
          <main class="main-content" :class="{ 'hidden': isMobileMenuOpen }">
            <div class="container-custom">
              <NuxtPage />
            </div>
          </main>
          <Footer :class="{ 'hidden': isMobileMenuOpen }" />
          <StickySocial v-if="!isMobileMenuOpen" />
        </template>
        <template v-else>
          <NuxtPage />
        </template>
      </ClientOnly>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { watch, computed, ref, onMounted } from 'vue'
import { useColorMode } from '#imports'
import { useRoute } from 'vue-router'
import { useNuxtApp } from '#app'
import StickySocial from '~/components/StickySocial.vue'

const nuxtApp = useNuxtApp()
const colorMode = useColorMode()
const route = useRoute()
const isMobileMenuOpen = ref(false)

// Check if current route is an auth route
const isAdminOrAuthRoute = computed(() => {
  const path = route.path
  return path.startsWith('/admin') || 
         path === '/login' || 
         path === '/auth/login' || 
         path === '/auth/register' ||
         path === '/auth/forgot-password' ||
         path === '/auth/reset-password'
})

// Initialize color mode on client side
onMounted(() => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const savedMode = localStorage.getItem('nuxt-color-mode')
  if (!savedMode) {
    colorMode.preference = prefersDark ? 'dark' : 'light' // explicitly set to light instead of system
  }
  // Ensure the value matches the preference
  colorMode.value = colorMode.preference
})

const handleMenuToggle = (isOpen: boolean) => {
  isMobileMenuOpen.value = isOpen;
  if (process.client) {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }
}

// Watch for color mode changes and update HTML class
watch(() => colorMode.preference, (newValue) => {
  if (process.client) {
    document.documentElement.classList.remove('light', 'dark', 'system')
    document.documentElement.classList.add(newValue)
  }
}, { immediate: true })
</script>

<style>
:root {
  --max-width: 1200px;
  --header-height: 3.75rem;
  --ticker-height: 2.5rem;
  --content-padding: 1rem;

  @media (max-width: 640px) {
    --content-padding: 0.75rem;
  }
}

/* Reset default margins and set dark mode colors */
body {
  margin: 0;
  padding: 0;
  @apply bg-white text-gray-900 dark:bg-[#0F1729] dark:text-white;
}

.app-wrapper {
  @apply min-h-screen flex flex-col;
  @apply bg-white text-gray-900 dark:bg-[#0F1729] dark:text-white;
  margin: 0;
  padding: 0;
  position: relative;
}

.app-wrapper.menu-open {
  height: 100vh;
  overflow: hidden;
}

.main-content {
  @apply flex-grow;
  min-height: calc(100vh - var(--header-height) - var(--ticker-height));
  padding: var(--content-padding) 0;
}

.container-custom {
  @apply mx-auto px-4;
  max-width: var(--max-width);
  width: 100%;
}

/* Dark mode scrollbar */
@media (prefers-color-scheme: dark) {
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    @apply bg-gray-800;
  }

  ::-webkit-scrollbar-thumb {
    @apply bg-gray-700;
    border-radius: 6px;
  }

  ::-webkit-scrollbar-thumb:hover {
    @apply bg-gray-600;
  }
}
</style>