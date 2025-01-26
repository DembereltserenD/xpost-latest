<template>
  <div class="space-y-8 p-6">
    <!-- Logo for mobile -->
    <div class="flex justify-center lg:hidden mb-12">
      <h1 class="text-3xl font-bold text-white">
        <span class="text-blue-500">X</span>post.mn
      </h1>
    </div>

    <!-- Forgot Password Form -->
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold text-white mb-2">Нууц үг сэргээх</h1>
        <p class="text-gray-400">Бүртгэлтэй имэйл хаягаа оруулна уу</p>
      </div>

      <form @submit.prevent="handleResetPassword" class="space-y-5">
        <!-- Success Message -->
        <div v-if="successMessage" class="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-500 text-sm">
          {{ successMessage }}
        </div>

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
            :disabled="loading"
          />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 px-4 bg-blue-500 text-white font-medium rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#15202b] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="!loading">Илгээх</span>
          <span v-else class="flex items-center justify-center">
            <svg class="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Илгээж байна...
          </span>
        </button>

        <!-- Back to Login -->
        <div class="text-center mt-4">
          <NuxtLink to="/auth/login" class="text-sm text-blue-500 hover:text-blue-400">
            Нэвтрэх хуудас руу буцах
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { createClient } from '@supabase/supabase-js'
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()
const supabase = createClient(
  config.public.supabaseUrl,
  config.public.supabaseKey
)

const email = ref('')
const error = ref('')
const loading = ref(false)
const successMessage = ref('')

const handleResetPassword = async () => {
  try {
    loading.value = true
    error.value = ''
    successMessage.value = ''

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email.value,
      {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      }
    )

    if (resetError) throw resetError

    successMessage.value = 'Нууц үг сэргээх холбоос таны имэйл хаяг руу илгээгдлээ'
    email.value = '' // Clear the email input
  } catch (err: any) {
    console.error('Password reset error:', err)
    error.value = err.message || 'Нууц үг сэргээх үед алдаа гарлаа'
  } finally {
    loading.value = false
  }
}

// Define the layout for this page
definePageMeta({
  layout: 'auth',
  ssr: false  // Enable CSR for authentication
})
</script>
