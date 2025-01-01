<template>
  <NuxtLayout>
    <div :class="['app-wrapper', colorMode.value]">
      <ClientOnly>
        <template v-if="!isAdminOrAuthRoute">
          <Ticker />
          <Header />
          <main class="main-content">
            <div class="container-custom">
              <NuxtPage />
            </div>
          </main>
          <Footer />
          <StickySocial />
        </template>
        <template v-else>
          <NuxtPage />
        </template>
      </ClientOnly>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { watch, computed } from 'vue'
import { useColorMode, useRoute } from '#imports'
import StickySocial from '~/components/StickySocial.vue'

const colorMode = useColorMode()
const route = useRoute()

const isAdminOrAuthRoute = computed(() => {
  return route.path.startsWith('/admin') || route.path.startsWith('/auth')
})

// Watch for color mode changes and update HTML class
watch(() => colorMode.value, (newValue) => {
  if (process.client) {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(newValue)
  }
}, { immediate: true })
</script>

<style>
:root {
  --header-height: 60px;
  --ticker-height: 32px;
  --max-width: 1200px;
}

.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}

.main-content {
  flex: 1;
  padding-top: calc(var(--header-height) + var(--ticker-height) - 3.2rem);
  margin-top: 0;
}

.container-custom {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1rem;
  width: 100%;
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

@media (max-width: 768px) {
  :root {
    --header-height: 60px;
    --ticker-height: 32px;
  }
}
</style>