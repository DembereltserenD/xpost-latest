
<template>
  <header class="header-wrapper">
    <nav class="header-nav">
      <div class="header-container">
        <!-- Logo and Site Name -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="flex items-center h-10">
            <template v-if="logoUrl">
              <img 
                :src="logoUrl"
                :key="settings?.logo_url"
                :style="{
                  width: 'auto',
                  height: '40px',
                  objectFit: 'contain'
                }"
                class="object-contain"
                :alt="settings?.sitename || 'Site Logo'"
                @error="handleImageError"
              />
            </template>
            <span v-else class="text-xl font-bold text-gray-900 dark:text-white">
              {{ settings?.sitename || 'Xpost.mn' }}
            </span>
          </NuxtLink>
        </div>

        <!-- Navigation (desktop only) -->
        <div class="nav-wrapper hidden lg:block">
          <Navigation :is-menu-open="isMenuOpen" @close="closeMenu" />
        </div>
        
        <!-- Additional Info -->
        <div class="flex-shrink-0 flex items-center">
          <InfoLinks class="hidden lg:flex font-bold" :is-menu-open="isMenuOpen" @close="closeMenu" />
          <div class="divider hidden lg:block"></div>
          <ColorModeToggle />
          <MobileMenuButton class="block lg:hidden" :is-active="isMenuOpen" @click="toggleMenu" />
        </div>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <MobileMenuContent 
      v-if="isMenuOpen" 
      class="lg:hidden"
      :is-menu-open="isMenuOpen"
      @close="closeMenu"
    />
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import Navigation from './header/Navigation.vue'
import InfoLinks from './header/InfoLinks.vue'
import ColorModeToggle from './ColorModeToggle.vue'
import MobileMenuButton from './header/MobileMenuButton.vue'
import MobileMenuContent from './MobileMenuContent.vue'
import { useSettings } from '~/composables/useSettings'

const isMenuOpen = ref(false)
const { settings, getPublicUrl, fetchSettings, subscribeToSettings } = useSettings()

const logoUrl = computed(() => {
  if (!settings.value?.logo_url) return null
  const url = getPublicUrl(settings.value.logo_url)
  console.log('Logo URL:', url) // Debug log
  return url
})

const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  console.error('Failed to load logo image:', {
    src: img.src,
    originalUrl: settings.value?.logo_url,
    computedUrl: logoUrl.value
  })
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

// Initialize settings
onMounted(async () => {
  console.log('Header mounted, fetching settings...')
  await fetchSettings()
  const unsubscribe = subscribeToSettings()
  onUnmounted(() => {
    unsubscribe()
  })
})
</script>

<style scoped>
.header-wrapper {
  @apply w-full relative z-50;
  @apply bg-white dark:bg-[#0F1729];
  height: var(--header-height);
}

.header-nav {
  @apply h-full border-b border-gray-200 dark:border-gray-800;
}

.header-container {
  @apply container mx-auto h-full px-4;
  @apply flex items-center justify-between;
  max-width: 1200px;
}

.divider {
  @apply w-px h-6 mx-4;
  @apply bg-gray-200 dark:bg-gray-700;
}

/* Mobile menu styles */
.mobile-menu-overlay {
  @apply fixed inset-0 z-50;
  @apply bg-white dark:bg-[#0F1729];
}

/* Make all text in header bold */
:deep(*) {
  @apply font-bold;
}
</style>
