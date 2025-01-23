<template>
  <div class="mobile-menu-wrapper">
    <div class="mobile-menu-content">
      <!-- Search Bar -->
      <div class="menu-item">
        <div class="flex items-center">
          <Search class="w-5 h-5 mr-3" />
          <input
            type="text"
            class="w-full bg-transparent outline-none"
            placeholder="Хайх..."
            v-model="searchQuery"
          />
        </div>
      </div>

      <!-- Quick Links -->
      <div class="space-y-2 mb-8">
        <h3 class="text-sm font-medium text-muted-foreground uppercase tracking-wide px-1 mb-3">
          Шуурхай холбоос
        </h3>
        <div class="grid grid-cols-2 gap-3">
          <div class="menu-item" v-for="link in quickLinks" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="flex items-center"
              @click="$emit('close')"
            >
              <component :is="link.icon" class="w-5 h-5 mr-3" />
              <span>{{ link.name }}</span>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Navigation Links -->
      <nav class="mb-8">
        <h3 class="text-sm font-medium text-muted-foreground uppercase tracking-wide px-1 mb-3">
          Цэс
        </h3>
        <Navigation :is-menu-open="true" @close="$emit('close')" />
      </nav>

      <!-- Social Links -->
      <div class="border-t border-border pt-6 mb-8">
        <h3 class="text-sm font-medium text-muted-foreground uppercase tracking-wide px-1 mb-4">
          Биднийг дагах
        </h3>
        <div class="flex justify-center space-x-6">
          <a
            v-for="social in socialLinks"
            :key="social.url"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-600 dark:text-gray-400"
            :title="social.name"
          >
            <component :is="social.icon" class="w-6 h-6" />
          </a>
        </div>
      </div>

      <!-- Footer Links -->
      <div class="border-t border-border pt-6 mt-auto">
        <div class="grid grid-cols-2 gap-x-4 gap-y-3">
          <NuxtLink
            v-for="link in footerLinks"
            :key="link.to"
            :to="link.to"
            class="text-sm text-muted-foreground hover:text-foreground
                   transition-colors duration-200"
            @click="$emit('close')"
          >
            {{ link.name }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  Search, 
  Thermometer, 
  Star, 
  DollarSign,
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube 
} from 'lucide-vue-next'
import Navigation from './header/Navigation.vue'

defineEmits(['close'])

const searchQuery = ref('')

const quickLinks = [
  { name: 'Цаг агаар', to: '/weather', icon: Thermometer },
  { name: 'Зурхай', to: '/horoscope', icon: Star },
  { name: 'Ханш', to: '/exchange', icon: DollarSign }
]

const socialLinks = [
  { name: 'Facebook', url: 'https://facebook.com/xpost', icon: Facebook },
  { name: 'Twitter', url: 'https://twitter.com/xpost', icon: Twitter },
  { name: 'Instagram', url: 'https://instagram.com/xpost', icon: Instagram },
  { name: 'Youtube', url: 'https://youtube.com/xpost', icon: Youtube }
]

const footerLinks = [
  { name: 'Бидний тухай', to: '/about' },
  { name: 'Холбоо барих', to: '/contact' },
  { name: 'Үйлчилгээний нөхцөл', to: '/terms' },
  { name: 'Нууцлалын бодлого', to: '/privacy' }
]

function handleSearch() {
  if (searchQuery.value.trim()) {
    navigateTo(`/search?q=${encodeURIComponent(searchQuery.value.trim())}`)
    emit('close')
  }
}
</script>

<style scoped>
.mobile-menu-wrapper {
  @apply h-full;
}

.mobile-menu-content {
  @apply flex flex-col h-full;
  @apply w-full mx-auto px-4 py-6;
  max-width: var(--max-width);
}

.menu-item {
  @apply p-3 rounded-lg;
  @apply bg-gray-100 dark:bg-gray-800;
  @apply hover:bg-gray-200 dark:hover:bg-gray-700;
  @apply transition-colors duration-200;
}

.menu-item a {
  @apply text-sm font-medium;
  @apply text-gray-700 dark:text-gray-300;
  @apply hover:text-gray-900 dark:hover:text-gray-100;
  @apply transition-colors duration-200;
}

/* Navigation styles */
nav :deep(.nav-links) {
  @apply flex flex-col space-y-2;
}

nav :deep(.dropdown) {
  @apply w-full;
}

nav :deep(.dropbtn) {
  @apply w-full justify-between;
  @apply p-3 rounded-lg;
  @apply bg-gray-100 dark:bg-gray-800;
  @apply hover:bg-gray-200 dark:hover:bg-gray-700;
}

nav :deep(.dropdown-content) {
  @apply static w-full mt-2;
  @apply visible opacity-100 translate-y-0 pointer-events-auto;
  @apply bg-transparent border-none shadow-none;
}

nav :deep(.dropdown-item) {
  @apply p-3 rounded-lg;
  @apply bg-gray-100 dark:bg-gray-800;
  @apply hover:bg-gray-200 dark:hover:bg-gray-700;
  @apply mb-2 last:mb-0;
}
</style>