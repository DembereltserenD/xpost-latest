<template>
  <div>
    <!-- Header -->
    <div class="mb-6 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Мэдээний жагсаалт</h1>
      <NuxtLink
        to="/admin/news/create"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Шинэ мэдээ
      </NuxtLink>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow mb-6 p-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Хайх</label>
          <input
            v-model="filters.search"
            type="text"
            class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Гарчиг эсвэл агуулгаар хайх..."
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ангилал</label>
          <select
            v-model="filters.category"
            class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Бүгд</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Эрэмбэлэх</label>
          <select
            v-model="filters.sort"
            class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="created_at:desc">Сүүлийн үеийн</option>
            <option value="created_at:asc">Хуучин</option>
            <option value="views:desc">Их үзэлттэй</option>
            <option value="views:asc">Бага үзэлттэй</option>
          </select>
        </div>
      </div>
    </div>

    <!-- News List -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Зураг</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Гарчиг</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ангилал</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Үзэлт</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Огноо</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Үйлдэл</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="item in news" :key="item.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <img 
                  :src="item.image_url" 
                  :alt="item.title"
                  class="w-12 h-12 rounded-lg object-cover"
                >
              </td>
              <td class="px-6 py-4">
                <div class="text-sm font-medium text-gray-900 dark:text-white">{{ item.title }}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">{{ item.excerpt }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                  {{ getCategoryName(item.category_id) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ item.views }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ new Date(item.created_at).toLocaleDateString('mn-MN') }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-2">
                  <NuxtLink
                    :to="'/admin/news/edit/' + item.id"
                    class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </NuxtLink>
                  <button
                    @click="handleDelete(item.id)"
                    class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="page > 1 && (page--)"
            :disabled="page === 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            :class="{ 'opacity-50 cursor-not-allowed': page === 1 }"
          >
            Өмнөх
          </button>
          <button
            @click="hasMore && page++"
            :disabled="!hasMore"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            :class="{ 'opacity-50 cursor-not-allowed': !hasMore }"
          >
            Дараах
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              Нийт <span class="font-medium">{{ totalItems }}</span> мэдээ
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                @click="page > 1 && (page--)"
                :disabled="page === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                :class="{ 'opacity-50 cursor-not-allowed': page === 1 }"
              >
                <span class="sr-only">Өмнөх</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              <button
                @click="hasMore && page++"
                :disabled="!hasMore"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                :class="{ 'opacity-50 cursor-not-allowed': !hasMore }"
              >
                <span class="sr-only">Дараах</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { createClient } from '@supabase/supabase-js'

const config = useRuntimeConfig()
const supabase = createClient(
  config.public.supabaseUrl,
  config.public.supabaseKey
)

const news = ref([])
const categories = ref([])
const totalItems = ref(0)
const page = ref(1)
const hasMore = ref(false)
const itemsPerPage = 10

const filters = ref({
  search: '',
  category: '',
  sort: 'created_at:desc'
})

// Watch for filter changes
watch(filters, () => {
  page.value = 1
  fetchNews()
}, { deep: true })

const fetchNews = async () => {
  try {
    let query = supabase
      .from('news')
      .select('*', { count: 'exact' })

    // Apply search filter
    if (filters.value.search) {
      query = query.or(`title.ilike.%${filters.value.search}%,content.ilike.%${filters.value.search}%`)
    }

    // Apply category filter
    if (filters.value.category) {
      query = query.eq('category_id', filters.value.category)
    }

    // Apply sorting
    const [column, order] = filters.value.sort.split(':')
    query = query.order(column, { ascending: order === 'asc' })

    // Apply pagination
    const from = (page.value - 1) * itemsPerPage
    const to = from + itemsPerPage - 1
    query = query.range(from, to)

    const { data, count, error } = await query

    if (error) throw error

    news.value = data
    totalItems.value = count
    hasMore.value = count > (page.value * itemsPerPage)
  } catch (err) {
    console.error('Error fetching news:', err)
  }
}

const fetchCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    if (error) throw error

    categories.value = data
  } catch (err) {
    console.error('Error fetching categories:', err)
  }
}

const getCategoryName = (categoryId) => {
  const category = categories.value.find(c => c.id === categoryId)
  return category ? category.name : 'Unknown'
}

const handleDelete = async (id: number) => {
  if (!confirm('Энэ мэдээг устгахдаа итгэлтэй байна уу?')) return

  try {
    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', id)

    if (error) throw error

    // Refresh the news list
    fetchNews()
  } catch (err) {
    console.error('Error deleting news:', err)
  }
}

onMounted(() => {
  fetchCategories()
  fetchNews()
})

definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin']
})
</script>
