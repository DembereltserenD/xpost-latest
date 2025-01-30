<template>
  <NuxtLayout>
    <div class="app-wrapper" :class="[colorMode.preference]">
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
    colorMode.preference = prefersDark ? 'dark' : 'system'
  }
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

/* Reset default margins */
body {
  margin: 0;
  padding: 0;
}

.app-wrapper {
  @apply min-h-screen flex flex-col;
  @apply bg-background text-foreground;
  margin: 0;
  padding: 0;
  position: relative;
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}

.app-wrapper.menu-open {
  height: 100vh;
  overflow: hidden;
}

.main-content {
  flex: 1;
}

.container-custom {
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding-left: var(--content-padding);
  padding-right: var(--content-padding);
}

/* Utility class for max-width container */
.max-w-container {
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding-left: var(--content-padding);
  padding-right: var(--content-padding);
}

/* Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

/* Reduce motion */
@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active {
    transition: none;
  }
}
</style>