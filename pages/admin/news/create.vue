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
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Зургийн URL</label>
              <input
                v-model="form.featured_image"
                type="url"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
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
                  <option value="archived">Архивлах</option>
                </select>
              </div>
            </div>

            <div class="flex items-center space-x-4">
              <label class="flex items-center">
                <input
                  v-model="form.is_featured"
                  type="checkbox"
                  class="rounded border-gray-300 text-blue-500 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Онцлох мэдээ</span>
              </label>

              <label class="flex items-center">
                <input
                  v-model="form.is_published"
                  type="checkbox"
                  class="rounded border-gray-300 text-blue-500 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Одоо нийтлэх</span>
              </label>
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
import { getCategories, createNewsArticle } from '~/lib/supabaseClient'

const router = useRouter()
const categories = ref([])
const error = ref(null)
const loading = ref(false)

const form = ref({
  title: '',
  content: '',
  excerpt: '',
  featured_image: '',
  category_id: null,
  status: 'draft',
  is_featured: false,
  is_published: false
})

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const createNews = async () => {
  try {
    loading.value = true
    error.value = null

    if (!form.value.category_id) {
      throw new Error('Ангилал сонгоно уу')
    }

    const newsData = {
      ...form.value,
      slug: generateSlug(form.value.title),
      published_at: form.value.is_published ? new Date().toISOString() : null,
      featured_position: form.value.is_featured ? 0 : null
    }

    await createNewsArticle(newsData)
    router.push('/admin/news')
  } catch (err) {
    error.value = err.message || 'Мэдээ үүсгэхэд алдаа гарлаа'
    console.error('Error creating news:', err)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  try {
    loading.value = true
    categories.value = await getCategories()
  } catch (err) {
    error.value = err.message || 'Ангилал татахад алдаа гарлаа'
    console.error('Error fetching categories:', err)
  } finally {
    loading.value = false
  }
})
</script>