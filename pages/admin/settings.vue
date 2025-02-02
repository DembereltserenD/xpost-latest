<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Тохиргоо</h1>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Сайтын үндсэн тохиргоог энд хийнэ</p>
      </div>

      <!-- Settings Form -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
        <!-- Site Identity -->
        <div class="p-6">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Сайтын мэдээлэл</h2>
          <div class="space-y-6">
            <!-- Logo Upload -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Лого
              </label>
              <div class="flex items-center space-x-6">
                <div v-if="logoPreview" class="flex-shrink-0 h-20 w-20">
                  <img :src="logoPreview" class="h-20 w-20 object-cover rounded-lg" />
                </div>
                <div v-else class="flex-shrink-0 h-20 w-20 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <svg class="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <button
                    type="button"
                    @click="$refs.logoInput.click()"
                    class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <svg class="-ml-1 mr-2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Лого оруулах
                  </button>
                  <input
                    ref="logoInput"
                    type="file"
                    class="hidden"
                    accept="image/*"
                    @change="handleLogoUpload"
                  />
                  <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG файл, дээд хэмжээ 2MB
                  </p>
                </div>
              </div>
            </div>

            <!-- Site Name -->
            <div>
              <label for="siteName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Сайтын нэр
              </label>
              <input
                id="siteName"
                v-model="form.siteName"
                type="text"
                class="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                :class="{ 'border-red-500': errors.siteName }"
              />
              <p v-if="errors.siteName" class="mt-1 text-sm text-red-500">{{ errors.siteName }}</p>
            </div>

            <!-- Site Description -->
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Тайлбар
              </label>
              <textarea
                id="description"
                v-model="form.description"
                rows="3"
                class="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Social Media Links -->
        <div class="p-6">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Сошиал хаягууд</h2>
          <div class="space-y-6">
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <!-- Facebook -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Facebook
                </label>
                <div class="mt-1 relative rounded-md shadow-sm">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <input
                    v-model="form.facebook"
                    type="text"
                    class="block w-full pl-10 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="https://facebook.com/..."
                  />
                </div>
              </div>

              <!-- Twitter -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Twitter
                </label>
                <div class="mt-1 relative rounded-md shadow-sm">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </div>
                  <input
                    v-model="form.twitter"
                    type="text"
                    class="block w-full pl-10 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="https://twitter.com/..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Analytics -->
        <div class="p-6">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Аналитик</h2>
          <div class="space-y-6">
            <!-- Google Analytics -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Google Analytics ID
              </label>
              <input
                v-model="form.googleAnalytics"
                type="text"
                class="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="UA-XXXXXXXXX-X"
              />
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Google Analytics ID-г энд оруулна
              </p>
            </div>
          </div>
        </div>

        <!-- Save Button -->
        <div class="p-6">
          <button
            type="button"
            @click="saveSettings"
            :disabled="loading"
            class="w-full sm:w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ loading ? 'Хадгалж байна...' : 'Хадгалах' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSupabaseClient } from '#imports'
import { useSettings } from '~/composables/useSettings'

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})

const supabase = useSupabaseClient()
const loading = ref(false)
const logoPreview = ref<string | null>(null)
const errors = ref<Record<string, string>>({})

// Get settings composable
const { settings: globalSettings, loading: settingsLoading, fetchSettings, updateSettings } = useSettings()

const form = ref({
  logo: null as File | null,
  siteName: '',
  description: '',
  facebook: '',
  twitter: '',
  googleAnalytics: ''
})

// Load current settings
const loadSettings = async () => {
  try {
    loading.value = true
    const { data: settings, error } = await supabase
      .from('settings')
      .select('*')
      .maybeSingle()

    if (error && error.code !== 'PGRST116') {
      throw error
    }

    if (settings) {
      form.value = {
        ...form.value,
        siteName: settings.sitename,
        description: settings.description || '',
        facebook: settings.facebook || '',
        twitter: settings.twitter || '',
        googleAnalytics: settings.google_analytics || '',
        logo: null
      }
      
      if (settings.logo_url) {
        logoPreview.value = settings.logo_url
      }
    }
  } catch (err) {
    console.error('Error loading settings:', err)
  } finally {
    loading.value = false
  }
}

// Handle logo upload
const handleLogoUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return

  const file = input.files[0]
  if (!file) return

  // Validate file size (2MB max)
  if (file.size > 2 * 1024 * 1024) {
    alert('Лого 2MB-с бага хэмжээтэй байх ёстой')
    return
  }

  // Preview the image
  const reader = new FileReader()
  reader.onload = (e) => {
    logoPreview.value = e.target?.result as string
  }
  reader.readAsDataURL(file)

  form.value.logo = file
}

// Save settings
const saveSettings = async () => {
  try {
    loading.value = true
    errors.value = {}

    // Validate
    if (!form.value.siteName) {
      errors.value.siteName = 'Сайтын нэр оруулна уу'
      return
    }

    // Upload logo if changed
    let logo_url = form.value.logo ? null : undefined // undefined means don't update
    if (form.value.logo) {
      const fileExt = form.value.logo.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`

      // Create bucket if it doesn't exist
      const { data: buckets } = await supabase
        .storage
        .listBuckets()

      if (!buckets?.find(b => b.name === 'logos')) {
        const { data: bucket, error: bucketError } = await supabase
          .storage
          .createBucket('logos', {
            public: true,
            fileSizeLimit: 2097152 // 2MB
          })
        
        if (bucketError) {
          console.error('Error creating bucket:', bucketError)
          throw bucketError
        }
      }

      const { error: uploadError, data } = await supabase.storage
        .from('logos')
        .upload(fileName, form.value.logo)

      if (uploadError) {
        console.error('Error uploading logo:', uploadError)
        throw uploadError
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('logos')
        .getPublicUrl(fileName)

      logo_url = publicUrl
      console.log('Uploaded logo URL:', logo_url)
    }

    // Get current settings
    const { data: currentSettings, error: fetchError } = await supabase
      .from('settings')
      .select('id')
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching current settings:', fetchError)
      throw fetchError
    }

    // Prepare settings data
    const settingsData = {
      sitename: form.value.siteName,
      description: form.value.description || '',
      facebook: form.value.facebook || '',
      twitter: form.value.twitter || '',
      google_analytics: form.value.googleAnalytics || '',
      ...(logo_url !== undefined && { logo_url })
    }

    console.log('Saving settings:', settingsData)

    // Update or insert settings
    const { error: upsertError } = await supabase
      .from('settings')
      .upsert({
        id: currentSettings?.id,
        ...settingsData
      })

    if (upsertError) {
      console.error('Error upserting settings:', upsertError)
      throw upsertError
    }

    // Refresh settings globally
    await fetchSettings()
    console.log('Settings refreshed')

    alert('Тохиргоо амжилттай хадгалагдлаа')
  } catch (err) {
    console.error('Error saving settings:', err)
    alert('Алдаа гарлаа: ' + (err.message || JSON.stringify(err)))
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadSettings()
})
</script>