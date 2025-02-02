<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="lg:pl-64">
      <div class="container mx-auto px-4 py-8">
        <div v-if="error" class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong class="font-bold">Алдаа!</strong>
          <span class="block sm:inline">{{ error }}</span>
          <button @click="error = null" class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
            </svg>
          </button>
        </div>

        <div v-if="loading" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
        </div>

        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Шинэ мэдээ</h1>
          <NuxtLink
            to="/admin/news"
            class="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white flex items-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Буцах
          </NuxtLink>
        </div>

        <form @submit.prevent="createNews" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Гарчиг</label>
              <input
                v-model="form.title"
                type="text"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Зураг</label>
              <div class="mt-1 flex items-center space-x-4">
                <div v-if="form.featured_image" class="relative w-32 h-32">
                  <img :src="form.featured_image" alt="Preview" class="w-full h-full object-cover rounded-lg" />
                  <button
                    @click="removeImage"
                    class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div class="flex-1">
                  <input
                    type="file"
                    ref="fileInput"
                    @change="handleImageUpload"
                    accept="image/*"
                    class="hidden"
                  />
                  <button
                    type="button"
                    @click="$refs.fileInput.click()"
                    class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Зураг сонгох
                  </button>
                  <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    PNG, JPG, GIF файлууд дэмжигдэнэ
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Хураангуй</label>
              <textarea
                v-model="form.excerpt"
                rows="3"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Агуулга</label>
              <textarea
                v-model="form.content"
                rows="10"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              ></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Ангилал</label>
                <select
                  v-model="form.category_id"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">Ангилал сонгох</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Төлөв</label>
                <select
                  v-model="form.status"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="draft">Ноорог</option>
                  <option value="published">Нийтлэх</option>
                </select>
              </div>
            </div>

            <div class="flex justify-end space-x-4">
              <button
                type="button"
                @click="$router.push('/admin/news')"
                class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Цуцлах
              </button>
              <button
                type="submit"
                class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Хадгалах
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin']
})

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSupabaseUser, useNuxtApp } from '#imports'
import { getCategories } from '~/lib/supabaseClient'
import { useNewsStore } from '~/stores/news'

const router = useRouter()
const user = useSupabaseUser()
const { $storage, $supabase } = useNuxtApp()
const newsStore = useNewsStore()
const categories = ref([])
const error = ref(null)
const loading = ref(false)
const fileInput = ref(null)

const form = ref({
  title: '',
  content: '',
  excerpt: '',
  featured_image: '',
  category_id: null,
  status: 'draft',
  views: 0,
  shares: 0,
  likes: 0
})

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const generateShortId = () => {
  // Generate a short, readable ID (6 characters)
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    // Ensure first character is a letter
    if (i === 0) {
      result += characters.slice(0, 26).charAt(Math.floor(Math.random() * 26));
    } else {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  }
  return result;
}

const handleImageUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  try {
    loading.value = true
    const path = `news/images/${Date.now()}-${file.name}`
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error('Please upload an image file')
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('Image size should be less than 5MB')
    }

    const { publicUrl } = await $storage.uploadFile(file, path, {
      visibility: 'public',
      cacheControl: '3600'
    })

    form.value.featured_image = publicUrl
  } catch (err: any) {
    console.error('Image upload error:', err)
    error.value = err?.message || 'Failed to upload image. Please try again.'
  } finally {
    loading.value = false
  }
}

const removeImage = async () => {
  if (!form.value.featured_image) return

  try {
    loading.value = true
    const url = new URL(form.value.featured_image)
    const pathParts = url.pathname.split('/')
    const bucket = pathParts[2] // Assuming URL format: /storage/v1/bucket/path
    const path = pathParts.slice(3).join('/') // Get everything after bucket
    
    await $storage.deleteFile(path, { bucket })
    form.value.featured_image = ''
  } catch (err: any) {
    console.error('Image removal error:', err)
    error.value = err?.message || 'Failed to remove image. Please try again.'
  } finally {
    loading.value = false
  }
}

const createNews = async () => {
  try {
    loading.value = true

    // Validate required fields for published articles
    if (form.value.status === 'published') {
      if (!form.value.title?.trim()) {
        throw new Error('Title is required for published articles')
      }
      if (!form.value.content?.trim()) {
        throw new Error('Content is required for published articles')
      }
      if (!form.value.category_id) {
        throw new Error('Category is required for published articles')
      }
    }

    const slug = generateSlug(form.value.title)
    const short_id = generateShortId()

    // Always validate short_id
    if (!short_id) {
      throw new Error('Failed to generate a valid short ID')
    }

    // Check for existing short_id
    const { data: existingNews, error: checkError } = await $supabase
      .from('news')
      .select('id, short_id')
      .eq('short_id', short_id)
      .maybeSingle()

    if (checkError) throw checkError

    // If short_id exists, try again
    if (existingNews) {
      loading.value = false
      return createNews()
    }

    const newsData = {
      title: form.value.title,
      slug,
      short_id, // Always include short_id
      content: form.value.content,
      excerpt: form.value.excerpt,
      featured_image: form.value.featured_image,
      category_id: form.value.category_id,
      is_published: form.value.status === 'published',
      is_featured: false,
      featured_position: null,
      published_at: form.value.status === 'published' ? new Date().toISOString() : null,
      user_id: user.value?.id
    }

    const { error: insertError } = await $supabase.from('news').insert([newsData])
    if (insertError) throw insertError

    newsStore.initialized = false
    await newsStore.init()
    router.push('/admin/news')
  } catch (err: any) {
    error.value = err.message || 'Мэдээ үүсгэхэд алдаа гарлаа'
    console.error('Error creating news:', err)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  try {
    categories.value = await getCategories()
  } catch (err) {
    error.value = err.message || 'Ангилал ачаалахад алдаа гарлаа'
    console.error('Error loading categories:', err)
  }
})
</script>