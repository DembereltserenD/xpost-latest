<template>
  <header class="fixed-header">
    <div class="header-grid">
      <!-- Logo -->
      <NuxtLink to="/" class="logo">
        <img src="/images/logo.svg" alt="xpost.mn logo" width="150" height="50">
      </NuxtLink>
      
      <!-- Navigation (desktop only) -->
      <Navigation :is-menu-open="isMenuOpen" @close="closeMenu" />
      
      <!-- Additional Info -->
      <InfoLinks :is-menu-open="isMenuOpen" @close="closeMenu" />
      
      <!-- Color Mode Toggle (Mobile) -->
      <div class="lg:hidden color-mode-toggle-mobile">
        <ColorModeToggle />
      </div>
      
      <!-- Hamburger Menu -->
      <MobileMenuButton :is-active="isMenuOpen" @click="toggleMenu" />
      
      <!-- Mobile Menu Overlay -->
      <div 
        v-if="isMenuOpen" 
        class="mobile-menu-dialog lg:hidden"
      >
        <div class="mobile-menu-header">
          <div class="header-grid">
            <div class="mobile-logo">
              <img src="/images/logo.svg" alt="Logo" />
            </div>
          </div>
        </div>
        <div class="mobile-menu-content" :class="{ active: isMenuOpen }">
          <nav class="mobile-nav-links">
            <NuxtLink 
              v-for="(link, index) in navLinks" 
              :key="index" 
              :to="link.to"
              :class="{ active: isActive(link.to) }"
              @click="closeMenu"
            >
              {{ link.name }}
            </NuxtLink>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCategoryStore } from '~/stores/categoryStore';
import ColorModeToggle from '~/components/ColorModeToggle.vue'
import Navigation from './header/Navigation.vue'
import InfoLinks from './header/InfoLinks.vue'
import MobileMenuButton from './header/MobileMenuButton.vue'

const categoryStore = useCategoryStore();

const isMenuOpen = ref(false)

const navLinks = computed(() => {
  return categoryStore.categories.map(category => ({
    to: `/category/${category.toLowerCase()}`,
    name: category
  }));
})

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}

function isActive(path: string) {
  return window.location.pathname === path
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
  @apply flex items-center justify-between h-full px-4;
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
  @apply fixed inset-0 bg-background z-50;
  @apply flex flex-col;
  height: 100vh;
  overflow-y: auto;
}

.mobile-menu-header {
  @apply sticky top-0 bg-background border-b border-border;
  height: var(--header-height);
}

.mobile-menu-content {
  @apply flex-1 flex flex-col p-4;
  transition: max-height 0.3s ease, opacity 0.3s ease;
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}

.mobile-menu-content.active {
  max-height: 200px;
  opacity: 1;
}

.mobile-nav-links {
  @apply space-y-4;
}

.mobile-nav-links a {
  @apply block py-2 px-4 text-lg font-medium text-foreground;
  @apply hover:bg-accent/50 rounded-md transition-colors;
}

.mobile-logo {
  @apply flex items-center flex-shrink-0;
  width: 150px;
}

.mobile-logo img {
  @apply w-full h-auto;
}

/* Color mode toggle for mobile */
.color-mode-toggle-mobile {
  @apply absolute right-16 top-1/2 -translate-y-1/2;
  z-index: 60;
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .mobile-menu-content {
    @apply transition-none;
  }
}
</style>