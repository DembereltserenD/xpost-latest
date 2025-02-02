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
          
          <!-- Debug Info -->
          <pre class="mb-4 p-2 bg-gray-100 dark:bg-gray-900 rounded text-xs">
            {{ JSON.stringify({ ...settings, logoWidth, logoHeight }, null, 2) }}
          </pre>

          <form @submit.prevent="saveSiteSettings" class="space-y-4">
            <!-- Logo Section -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Лого
              </label>
              <div class="flex items-center space-x-4">
                <!-- Logo Preview -->
                <div class="relative flex-shrink-0 h-20 w-20 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                  <template v-if="settings?.logo_url">
                    <img 
                      :src="getPublicUrl(settings.logo_url)"
                      :key="settings.logo_url"
                      :style="{
                        width: settings.logo_width ? `${settings.logo_width}px` : '200px',
                        height: settings.logo_height ? `${settings.logo_height}px` : '100px',
                        maxHeight: '80px'
                      }"
                      class="object-contain"
                      alt="Site Logo"
                      @error="handleImageError"
                    />
                  </template>
                  <template v-else>
                    <svg class="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </template>

                  <!-- Remove Button -->
                  <button
                    v-if="settings?.logo_url"
                    type="button"
                    @click="removeLogo"
                    class="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <!-- Upload Button -->
                <div>
                  <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="handleLogoUpload"
                  >
                  <button
                    type="button"
                    @click="$refs.fileInput.click()"
                    class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
                  >
                    {{ settings?.logo_url ? 'Лого солих' : 'Лого оруулах' }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Size Controls -->
            <div v-if="settings?.logo_url" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Өргөн (px)
                </label>
                <div class="flex items-center space-x-2">
                  <input
                    v-model.number="logoWidth"
                    type="range"
                    min="50"
                    max="400"
                    step="10"
                    class="w-full"
                    @input="handleDimensionChange"
                  >
                  <span class="text-sm text-gray-600 dark:text-gray-400 w-12">{{ logoWidth }}</span>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Өндөр (px)
                </label>
                <div class="flex items-center space-x-2">
                  <input
                    v-model.number="logoHeight"
                    type="range"
                    min="30"
                    max="300"
                    step="10"
                    class="w-full"
                    @input="handleDimensionChange"
                  >
                  <span class="text-sm text-gray-600 dark:text-gray-400 w-12">{{ logoHeight }}</span>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Сайтын нэр
              </label>
              <input
                v-model="settings.sitename"
                type="text"
                class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Тайлбар
              </label>
              <textarea
                v-model="settings.description"
                rows="3"
                class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
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
          <form @submit.prevent="saveSiteSettings" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Facebook
              </label>
              <input
                v-model="settings.facebook"
                type="url"
                class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Twitter
              </label>
              <input
                v-model="settings.twitter"
                type="url"
                class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Google Analytics
              </label>
              <input
                v-model="settings.google_analytics"
                type="text"
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
import { ref, onMounted, onUnmounted } from 'vue'
import { useSupabaseClient } from '#imports'
import { useSettings } from '~/composables/useSettings'

const supabase = useSupabaseClient()
const fileInput = ref<HTMLInputElement | null>(null)
const logoWidth = ref(200)
const logoHeight = ref(100)
const { settings, fetchSettings, updateSettings, subscribeToSettings, getPublicUrl } = useSettings()

const handleImageError = () => {
  if (settings.value) {
    updateSettings({
      logo_url: null,
      logo_width: null,
      logo_height: null
    }).catch(error => {
      console.error('Error handling image error:', error)
    })
  }
}

const handleLogoUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `logos/${fileName}`

    // Store old logo path for cleanup
    const oldLogoPath = settings.value?.logo_url

    // Upload the new file first
    const { error: uploadError } = await supabase.storage
      .from('public')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    // Load image to get natural dimensions
    const img = new Image()
    img.onload = async () => {
      const aspectRatio = img.naturalWidth / img.naturalHeight
      let newWidth, newHeight

      if (aspectRatio > 1) {
        newWidth = 200
        newHeight = Math.round(200 / aspectRatio)
      } else {
        newHeight = 100
        newWidth = Math.round(100 * aspectRatio)
      }

      if (settings.value) {
        // Update settings with new logo
        await updateSettings({
          logo_url: filePath,
          logo_width: newWidth,
          logo_height: newHeight
        })

        // Only after successful update, remove the old logo
        if (oldLogoPath) {
          await supabase.storage
            .from('public')
            .remove([oldLogoPath])
        }
      }
    }

    const { data: { publicUrl } } = supabase.storage
      .from('public')
      .getPublicUrl(filePath)
    img.src = publicUrl
  } catch (error) {
    console.error('Error uploading logo:', error)
  } finally {
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  }
}

const removeLogo = async () => {
  if (settings.value?.logo_url) {
    try {
      const oldLogoPath = settings.value.logo_url

      // Update settings first
      await updateSettings({
        logo_url: null,
        logo_width: null,
        logo_height: null
      })

      // Only after successful update, remove the file
      if (oldLogoPath) {
        await supabase.storage
          .from('public')
          .remove([oldLogoPath])
      }
    } catch (error) {
      console.error('Error removing logo:', error)
    }
  }
}

const saveSiteSettings = async () => {
  if (!settings.value) return

  try {
    await updateSettings({
      sitename: settings.value.sitename,
      description: settings.value.description,
      facebook: settings.value.facebook,
      twitter: settings.value.twitter,
      google_analytics: settings.value.google_analytics
    })
  } catch (error) {
    console.error('Error saving settings:', error)
  }
}

onMounted(async () => {
  await fetchSettings()
  const unsubscribe = subscribeToSettings()
  onUnmounted(() => {
    unsubscribe()
  })
})
</script>
