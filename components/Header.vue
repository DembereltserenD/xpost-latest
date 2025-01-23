<template>
  <header class="header">
    <div class="container max-w-container header-content" :class="{ 'menu-open': isMenuOpen }">
      <!-- Logo -->
      <div class="logo-wrapper">
        <NuxtLink to="/" class="logo">
          <img src="/images/logo.svg" alt="xpost.mn logo" class="h-full w-auto max-w-[120px] sm:max-w-[150px]">
        </NuxtLink>
      </div>
      
      <!-- Navigation (desktop only) -->
      <div class="nav-wrapper hidden lg:block">
        <Navigation :is-menu-open="isMenuOpen" @close="closeMenu" />
      </div>
      
      <!-- Additional Info -->
      <div class="right-content">
        <InfoLinks class="hidden lg:flex" :is-menu-open="isMenuOpen" @close="closeMenu" />
        <div class="divider hidden lg:block"></div>
        <ColorModeToggle />
        <MobileMenuButton class="block lg:hidden" :is-active="isMenuOpen" @click="toggleMenu" />
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div 
      v-if="isMenuOpen" 
      class="mobile-menu-overlay"
      :style="{
        background: $colorMode.value === 'dark' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)'
      }"
    >
      <MobileMenuContent @close="closeMenu" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ColorModeToggle from '~/components/ColorModeToggle.vue'
import Navigation from './header/Navigation.vue'
import InfoLinks from './header/InfoLinks.vue'
import MobileMenuButton from './header/MobileMenuButton.vue'
import MobileMenuContent from './MobileMenuContent.vue'

const isMenuOpen = ref(false)
const emit = defineEmits(['menu-toggle'])

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
  emit('menu-toggle', isMenuOpen.value)
}

function closeMenu() {
  isMenuOpen.value = false
  emit('menu-toggle', false)
}
</script>

<style scoped>
.header {
  @apply relative z-50;
  @apply bg-white dark:bg-background;
  @apply border-b border-gray-100 dark:border-gray-800;
  height: var(--header-height);
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  width: 100%;
  overflow-x: hidden;
}

.header-content {
  @apply flex items-center justify-between;
  @apply w-full;
  height: 100%;
  margin: 0 auto;
  padding: 0 var(--content-padding);
}

.logo-wrapper {
  @apply relative z-10 flex-shrink-0;
  height: 32px;
}

.logo {
  @apply block transition-all duration-300 hover:opacity-90;
  height: 100%;
  transform-origin: left center;
}

.logo:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 0 8px rgba(var(--color-primary-rgb), 0.3));
}

.nav-wrapper {
  @apply flex-1 mx-4;
}

.right-content {
  @apply flex items-center gap-2 sm:gap-4;
  & > * {
    @apply transition-transform duration-200;
  }
  
  & > *:hover {
    transform: translateY(-2px);
  }
}

.divider {
  @apply w-px h-6 bg-border mx-2;
}

.mobile-menu-overlay {
  @apply fixed inset-0 z-50;
  height: calc(100vh - var(--header-height) - var(--ticker-height));
}

/* Mobile styles */
@media (max-width: 1023px) {
  .header-content.menu-open {
    @apply px-0;
  }
  
  .divider {
    @apply hidden;
  }
}

/* Ensure no horizontal scroll */
:deep(*) {
  max-width: 100vw;
  word-wrap: break-word;
}
</style>