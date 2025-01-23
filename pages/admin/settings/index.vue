<template>
  <div>
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Системийн тохиргоо</h1>
    </div>

    <!-- Settings Sections -->
    <div class="space-y-6">
      <!-- Site Settings -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div class="p-6">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Сайтын тохиргоо</h2>
          <form @submit.prevent="saveSiteSettings" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Сайтын нэр
              </label>
              <input
                v-model="siteSettings.siteName"
                type="text"
                class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Тайлбар
              </label>
              <textarea
                v-model="siteSettings.description"
                rows="3"
                class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Лого
              </label>
              <div class="flex items-center space-x-4">
                <img 
                  :src="siteSettings.logo || 'https://via.placeholder.com/150'" 
                  class="h-12 w-12 object-contain rounded"
                  alt="Site Logo"
                >
                <button
                  type="button"
                  class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Лого солих
                </button>
              </div>
            </div>
            <div class="flex justify-end">
              <button
                type="submit"
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Хадгалах
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Email Settings -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div class="p-6">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Имэйл тохиргоо</h2>
          <form @submit.prevent="saveEmailSettings" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                SMTP Host
              </label>
              <input
                v-model="emailSettings.smtpHost"
                type="text"
                class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                SMTP Port
              </label>
              <input
                v-model="emailSettings.smtpPort"
                type="number"
                class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                SMTP Username
              </label>
              <input
                v-model="emailSettings.smtpUsername"
                type="text"
                class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                SMTP Password
              </label>
              <input
                v-model="emailSettings.smtpPassword"
                type="password"
                class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            <div class="flex justify-end">
              <button
                type="submit"
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Хадгалах
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Social Media Settings -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div class="p-6">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Сошиал холбоос</h2>
          <form @submit.prevent="saveSocialSettings" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Facebook
              </label>
              <input
                v-model="socialSettings.facebook"
                type="url"
                class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Twitter
              </label>
              <input
                v-model="socialSettings.twitter"
                type="url"
                class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Instagram
              </label>
              <input
                v-model="socialSettings.instagram"
                type="url"
                class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            <div class="flex justify-end">
              <button
                type="submit"
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Хадгалах
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRuntimeConfig, useSupabaseClient } from '#imports'

const supabase = useSupabaseClient()
const config = useRuntimeConfig()

const siteSettings = ref({
  siteName: '',
  description: '',
  logo: ''
})

const emailSettings = ref({
  smtpHost: '',
  smtpPort: 587,
  smtpUsername: '',
  smtpPassword: ''
})

const socialSettings = ref({
  facebook: '',
  twitter: '',
  instagram: ''
})

const fetchSettings = async () => {
  try {
    const { data: siteData, error: siteError } = await supabase
      .from('settings')
      .select('*')
      .eq('type', 'site')
      .single()

    if (!siteError && siteData) {
      siteSettings.value = siteData.settings
    }

    const { data: emailData, error: emailError } = await supabase
      .from('settings')
      .select('*')
      .eq('type', 'email')
      .single()

    if (!emailError && emailData) {
      emailSettings.value = emailData.settings
    }

    const { data: socialData, error: socialError } = await supabase
      .from('settings')
      .select('*')
      .eq('type', 'social')
      .single()

    if (!socialError && socialData) {
      socialSettings.value = socialData.settings
    }
  } catch (err) {
    console.error('Error fetching settings:', err)
  }
}

const saveSiteSettings = async () => {
  try {
    const { error } = await supabase
      .from('settings')
      .upsert({
        type: 'site',
        settings: siteSettings.value
      })

    if (error) throw error

    alert('Сайтын тохиргоо амжилттай хадгалагдлаа')
  } catch (err) {
    console.error('Error saving site settings:', err)
    alert('Алдаа гарлаа')
  }
}

const saveEmailSettings = async () => {
  try {
    const { error } = await supabase
      .from('settings')
      .upsert({
        type: 'email',
        settings: emailSettings.value
      })

    if (error) throw error

    alert('Имэйл тохиргоо амжилттай хадгалагдлаа')
  } catch (err) {
    console.error('Error saving email settings:', err)
    alert('Алдаа гарлаа')
  }
}

const saveSocialSettings = async () => {
  try {
    const { error } = await supabase
      .from('settings')
      .upsert({
        type: 'social',
        settings: socialSettings.value
      })

    if (error) throw error

    alert('Сошиал тохиргоо амжилттай хадгалагдлаа')
  } catch (err) {
    console.error('Error saving social settings:', err)
    alert('Алдаа гарлаа')
  }
}

onMounted(() => {
  fetchSettings()
})

definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin']
})
</script>
