<template>
  <header class="fixed-header">
    <div class="header-grid">
      <!-- Logo -->
      <NuxtLink to="/" class="logo">
        <img src="/images/logo.svg" alt="xpost.mn logo" width="150" height="50">
      </NuxtLink>
      
      <!-- Navigation (desktop only) -->
      <div class="hidden lg:block flex-1">
        <Navigation :is-menu-open="isMenuOpen" @close="closeMenu" />
      </div>
      
      <!-- Additional Info -->
      <div class="hidden lg:block">
        <InfoLinks :is-menu-open="isMenuOpen" @close="closeMenu" />
      </div>
      
      <!-- Mobile Controls -->
      <div class="flex items-center gap-2 lg:hidden ml-auto">
        <ColorModeToggle />
        <MobileMenuButton @click="toggleMenu" />
      </div>
      
      <!-- Mobile Menu Overlay -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div 
          v-if="isMenuOpen" 
          class="mobile-menu-dialog lg:hidden"
          @click.self="closeMenu"
        >
          <MobileMenuContent @close="closeMenu" />
        </div>
      </Transition>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCategoryStore } from '~/stores/category'
import ColorModeToggle from '~/components/ColorModeToggle.vue'
import Navigation from './header/Navigation.vue'
import InfoLinks from './header/InfoLinks.vue'
import MobileMenuButton from './header/MobileMenuButton.vue'
import MobileMenuContent from './MobileMenuContent.vue'

const categoryStore = useCategoryStore()
const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}
</script>

<style scoped>
.fixed-header {
  @apply fixed top-[var(--ticker-height)] left-0 right-0 z-50;
  @apply bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60;
  @apply border-b border-border shadow-sm;
  height: var(--header-height);
}

.header-grid {
  @apply flex items-center h-full px-4;
  max-width: var(--max-width);
  margin: 0 auto;
}

.logo {
  @apply flex items-center flex-shrink-0;
  width: 150px;
}

.logo img {
  @apply w-full h-auto;
}

/* Mobile menu dialog */
.mobile-menu-dialog {
  @apply fixed inset-0 bg-background/95 backdrop-blur-sm z-50;
  @apply flex flex-col;
  top: calc(var(--header-height) + var(--ticker-height));
  height: calc(100vh - var(--header-height) - var(--ticker-height));
}
</style>
