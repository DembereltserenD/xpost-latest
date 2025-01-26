<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="lg:pl-64">
      <div class="container mx-auto px-4 py-8">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Мэдээний жагсаалт</h1>
          <NuxtLink
            to="/admin/news/create"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Шинэ мэдээ
          </NuxtLink>
        </div>

        <!-- Error State -->
        <div v-if="error" class="bg-red-50 dark:bg-red-900 p-4 rounded-lg mb-6">
          <p class="text-red-600 dark:text-red-200">{{ error }}</p>
        </div>

        <!-- Loading State -->
        <div v-else-if="loading" class="text-center py-8">
          <div class="text-gray-500 dark:text-gray-400">Ачаалж байна...</div>
        </div>

        <!-- Empty State -->
        <div v-else-if="newsItems.length === 0" class="text-center py-8">
          <div class="text-gray-500 dark:text-gray-400">Мэдээ олдсонгүй</div>
        </div>

        <!-- News List -->
        <div v-else class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Гарчиг
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Ангилал
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Төлөв
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Огноо
                  </th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Үйлдэл
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="news in newsItems" :key="news.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{ news.title }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500 dark:text-gray-300">{{ news.category?.name }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                      :class="{
                        'bg-green-100 text-green-800': news.status === 'published',
                        'bg-yellow-100 text-yellow-800': news.status === 'draft',
                        'bg-gray-100 text-gray-800': news.status === 'archived'
                      }"
                    >
                      {{ news.status === 'published' ? 'Нийтлэгдсэн' : news.status === 'draft' ? 'Ноорог' : 'Архивлагдсан' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {{ new Date(news.created_at).toLocaleDateString('mn-MN') }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div class="flex justify-end space-x-2">
                      <NuxtLink
                        :to="'/admin/news/edit/' + news.id"
                        class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Засах
                      </NuxtLink>
                      <button
                        @click="deleteNews(news.id)"
                        class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Устгах
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin']
})

import { ref } from 'vue'
import { getNewsArticles, deleteNewsArticle } from '~/lib/supabaseClient'

const newsItems = ref([])
const loading = ref(true)
const error = ref(null)

// Use Nuxt's composables for data fetching with error handling
const { data: news, pending, refresh } = useLazyAsyncData(
  'admin-news',
  async () => {
    try {
      const data = await getNewsArticles()
      error.value = null
      return data
    } catch (err) {
      error.value = err.message
      return []
    }
  },
  {
    server: true,
    immediate: true
  }
)

// Keep the ref in sync with asyncData
watchEffect(() => {
  if (news.value) {
    newsItems.value = news.value
  }
  loading.value = pending.value
})

// Watch for route changes and refresh data
watch(
  () => useRoute().fullPath,
  () => refresh(),
  { immediate: true }
)

const deleteNews = async (id: string) => {
  if (!confirm('Энэ мэдээг устгахдаа итгэлтэй байна уу?')) return
  
  try {
    await deleteNewsArticle(id)
    refresh()
  } catch (err) {
    console.error('Error deleting news:', err)
    error.value = err.message
  }
}
</script>
