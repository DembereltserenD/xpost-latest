<template>
  <div class="space-y-8 p-6">
    <!-- Logo for mobile -->
    <div class="flex justify-center lg:hidden mb-12">
      <h1 class="text-3xl font-bold text-white">
        <span class="text-blue-500">X</span>post.mn
      </h1>
    </div>

    <!-- Login Form -->
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold text-white mb-2">Нэвтрэх</h1>
        <p class="text-gray-400">Нэвтрэх мэдээллээ оруулна уу</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <!-- Error Alert -->
        <div v-if="error" class="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
          {{ error }}
        </div>

        <!-- Email Input -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-300">Имэйл</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full px-4 py-3 bg-[#1d2935] border border-[#2d3b48] rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-500 transition-colors"
          />
        </div>

        <!-- Password Input -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-300">Нууц үг</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full px-4 py-3 bg-[#1d2935] border border-[#2d3b48] rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-500 transition-colors"
          />
        </div>

        <!-- Remember me & Forgot password -->
        <div class="flex items-center justify-between">
          <label class="flex items-center">
            <input type="checkbox" class="w-4 h-4 rounded border-gray-600 text-blue-500 focus:ring-blue-500 bg-[#1d2935]">
            <span class="ml-2 text-sm text-gray-300">Сануулах</span>
          </label>
          <NuxtLink 
            to="/auth/forgot-password" 
            class="text-sm text-blue-500 hover:text-blue-400 transition-colors"
          >
            Нууц үгээ мартсан?
          </NuxtLink>
        </div>

        <!-- Login Button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 px-4 bg-blue-500 text-white font-medium rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#15202b] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="!loading">Нэвтрэх</span>
          <span v-else class="flex items-center justify-center">
            <svg class="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Нэвтрэж байна...
          </span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { createClient } from '@supabase/supabase-js'
import { useRuntimeConfig, navigateTo } from '#imports'

const config = useRuntimeConfig()
const supabase = createClient(
  config.public.supabaseUrl,
  config.public.supabaseKey
)

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

// Check for existing session on mount
onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession()
  if (session) {
    navigateTo('/admin')
  }
})

const handleLogin = async () => {
  try {
    loading.value = true
    error.value = ''
    
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })

    if (authError) throw authError

    // Redirect to admin page on successful login
    navigateTo('/admin')
  } catch (err: any) {
    console.error('Login error:', err)
    error.value = err.message || 'Нэвтрэх үед алдаа гарлаа'
  } finally {
    loading.value = false
  }
}

// Define the layout for this page
definePageMeta({
  layout: 'auth',
  middleware: ['auth']
})
</script>

<style scoped>
/* Add any page-specific styles here */
</style>
