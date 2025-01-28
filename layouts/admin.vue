<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Sidebar -->
    <aside 
      :class="[
        'fixed inset-y-0 left-0 z-20 bg-white dark:bg-gray-800 shadow-lg transform lg:transform-none lg:opacity-100 transition-all duration-300',
        isSidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 lg:translate-x-0'
      ]"
      class="w-64"
    >
      <!-- Logo -->
      <div class="flex items-center justify-between h-16 px-4 border-b dark:border-gray-700">
        <h1 class="text-xl font-bold text-gray-900 dark:text-white">
          <span class="text-blue-500">X</span>post.mn
        </h1>
        <button 
          @click="isSidebarOpen = false"
          class="lg:hidden text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Navigation -->
      <nav class="px-4 py-4 space-y-1">
        <NuxtLink 
          to="/admin" 
          class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          :class="{ 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-500': route.path === '/admin' }"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Хянах самбар
        </NuxtLink>

        <NuxtLink 
          to="/admin/news" 
          class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          :class="{ 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-500': route.path.startsWith('/admin/news') }"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H14" />
          </svg>
          Мэдээ
        </NuxtLink>

        <NuxtLink 
          to="/admin/categories" 
          class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          :class="{ 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-500': route.path === '/admin/categories' }"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          Ангилал
        </NuxtLink>

        <NuxtLink 
          to="/admin/users" 
          class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          :class="{ 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-500': route.path === '/admin/users' }"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Хэрэглэгчид
        </NuxtLink>

        <NuxtLink 
          to="/admin/settings" 
          class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          :class="{ 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-500': route.path === '/admin/settings' }"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Тохиргоо
        </NuxtLink>
      </nav>
    </aside>

    <!-- Overlay -->
    <div 
      v-if="isSidebarOpen" 
      @click="isSidebarOpen = false"
      class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-10 lg:hidden"
    ></div>

    <!-- Main Content -->
    <div class="lg:pl-64 flex-1">
      <!-- Top Navigation -->
      <nav class="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-white dark:bg-gray-800 shadow-sm z-10">
        <div class="px-4 h-full flex items-center justify-between">
          <!-- Mobile menu button -->
          <button 
            @click="isSidebarOpen = !isSidebarOpen"
            class="lg:hidden text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <!-- Right side navigation items -->
          <div class="flex items-center space-x-4">
            <!-- Theme Toggle -->
            <button 
              @click="toggleTheme"
              class="p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 rounded-lg"
            >
              <svg v-if="colorMode.value === 'dark'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>

            <!-- User Profile Dropdown -->
            <div class="relative">
              <button 
                @click="isProfileOpen = !isProfileOpen"
                class="flex items-center space-x-3 focus:outline-none"
              >
                <img 
                  :src="getAvatarUrl"
                  class="w-8 h-8 rounded-full"
                  alt="Profile"
                >
                <span class="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {{ getUserEmail }}
                </span>
              </button>

              <!-- Dropdown menu -->
              <div 
                v-if="isProfileOpen"
                class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1"
              >
                <button
                  @click="handleLogout"
                  class="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/50"
                >
                  Гарах
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <!-- Page Content -->
      <main class="pt-16 min-h-screen">
        <div class="px-4">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSupabaseClient } from '#imports'
import { useColorMode } from '#imports'
import type { User } from '@supabase/supabase-js'

const route = useRoute()
const supabase = useSupabaseClient()
const colorMode = useColorMode()
const isSidebarOpen = ref(false)
const isProfileOpen = ref(false)
const user = ref<User | null>(null)

const getAvatarUrl = computed(() => {
  return user.value?.user_metadata?.avatar_url || 'https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff'
})

const getUserEmail = computed(() => {
  return user.value?.email || 'Admin'
})

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const handleLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    navigateTo('/auth/login')
  } catch (err) {
    console.error('Logout error:', err)
  }
}

onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession()
  if (session?.user) {
    user.value = session.user
  }
})
</script>

<style>
/* Transition for sidebar */
.sidebar-enter-active,
.sidebar-leave-active {
  transition: transform 0.3s ease;
}

.sidebar-enter-from,
.sidebar-leave-to {
  transform: translateX(-100%);
}
</style>
