<template>
  <aside class="w-full lg:w-80 space-y-6">
    <!-- Error Alert -->
    <div v-if="error" 
         class="p-4 rounded-lg bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400 dark:text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-red-700 dark:text-red-400">{{ error }}</p>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="space-y-4">
      <div v-for="n in 3" :key="n" 
           class="animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800 p-6">
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div class="space-y-3 mt-4">
          <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        </div>
      </div>
    </div>

    <template v-else>
      <!-- Breaking News Section -->
      <section v-if="breakingNews.length > 0" 
               class="rounded-xl border bg-white shadow-sm transition-colors dark:bg-gray-900 dark:border-gray-800">
        <div class="px-6 py-4 border-b dark:border-gray-800">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Онцлох мэдээ
          </h3>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="(news, index) in breakingNews" :key="index" 
                 class="group">
              <div class="flex items-start space-x-3">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                  Онцлох
                </span>
                <NuxtLink :to="news.link" 
                         class="text-sm text-gray-900 hover:text-primary-600 line-clamp-2 transition-colors dark:text-gray-300 dark:hover:text-primary-400">
                  {{ news.title }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Popular News Section -->
      <section v-if="popularNews.length > 0" 
               class="rounded-xl border bg-white shadow-sm transition-colors dark:bg-gray-900 dark:border-gray-800">
        <div class="px-6 py-4 border-b dark:border-gray-800">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Тренд мэдээ
          </h3>
        </div>
        <div class="divide-y dark:divide-gray-800">
          <div v-for="(item, index) in popularNews" :key="index" 
               class="p-6 group">
            <div class="flex items-start space-x-4">
              <div class="relative flex-shrink-0">
                <img :src="item.image" :alt="item.title" 
                     class="h-20 w-20 rounded-lg object-cover bg-gray-100 dark:bg-gray-800" />
                <div class="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10 dark:ring-white/10"></div>
              </div>
              <div class="flex-1 min-w-0">
                <NuxtLink :to="item.link" 
                         class="block text-sm font-medium text-gray-900 hover:text-primary-600 line-clamp-2 transition-colors dark:text-gray-300 dark:hover:text-primary-400">
                  {{ item.title }}
                </NuxtLink>
                <div class="mt-2 flex items-center space-x-2 text-xs">
                  <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                    {{ item.category }}
                  </span>
                  <span class="text-gray-500 dark:text-gray-400">
                    {{ formatDate(item.date) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Categories Section -->
      <section v-if="categories.length > 0" 
               class="rounded-xl border bg-white shadow-sm transition-colors dark:bg-gray-900 dark:border-gray-800">
        <div class="px-6 py-4 border-b dark:border-gray-800">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Категорууд
          </h3>
        </div>
        <div class="p-2">
          <div class="space-y-1">
            <NuxtLink v-for="(category, index) in categories" :key="index" 
                      :to="category.link"
                      class="flex items-center justify-between px-4 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors dark:text-gray-300 dark:hover:bg-gray-800/50 dark:hover:text-primary-400">
              <span>{{ category.name }}</span>
              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                {{ category.count }}
              </span>
            </NuxtLink>
          </div>
        </div>
      </section>
    </template>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSupabaseClient } from '#imports'

// Add new data structures
interface BreakingNews {
  title: string;
  link: string;
}

interface PopularNews {
  title: string;
  image: string;
  link: string;
  category: string;
  date: string;
}

interface Category {
  name: string;
  link: string;
  count: number;
}

// Initialize Supabase client
const supabase = useSupabaseClient()

// Add new reactive data
const breakingNews = ref<BreakingNews[]>([])
const popularNews = ref<PopularNews[]>([])
const categories = ref<Category[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// Fetch breaking news
const fetchBreakingNews = async () => {
  try {
    const { data, error: supaError } = await supabase
      .from('posts')
      .select('title, slug')
      .eq('is_breaking', true)
      .order('created_at', { ascending: false })
      .limit(3)

    if (supaError) throw supaError

    if (data) {
      breakingNews.value = data.map(item => ({
        title: item.title,
        link: `/news/${item.slug}`
      }))
    }
  } catch (e: any) {
    console.error('Error fetching breaking news:', e)
    breakingNews.value = []
  }
}

// Fetch popular news
const fetchPopularNews = async () => {
  try {
    const { data, error: supaError } = await supabase
      .from('posts')
      .select('title, slug, image_url, category, created_at')
      .order('views', { ascending: false })
      .limit(3)

    if (supaError) throw supaError

    if (data) {
      popularNews.value = data.map(item => ({
        title: item.title,
        image: item.image_url || '/placeholder-image.jpg',
        link: `/news/${item.slug}`,
        category: item.category,
        date: item.created_at
      }))
    }
  } catch (e: any) {
    console.error('Error fetching popular news:', e)
    popularNews.value = []
  }
}

// Fetch categories
const fetchCategories = async () => {
  try {
    const { data, error: categoriesError } = await supabase
      .from('categories')
      .select('name, slug')
      .order('name')

    if (categoriesError) throw categoriesError

    if (data) {
      categories.value = data.map(item => ({
        name: item.name,
        link: `/category/${item.slug}`,
        count: 0 // Default to 0 for now
      }))
    }
  } catch (e: any) {
    console.error('Error fetching categories:', e)
    categories.value = []
  }
}

// Format date helper function
const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

// Fetch all data on component mount
const initialize = async () => {
  loading.value = true
  error.value = null
  
  try {
    await Promise.allSettled([
      fetchBreakingNews(),
      fetchPopularNews(),
      fetchCategories()
    ])
  } catch (e: any) {
    console.error('Error in sidebar component:', e)
    error.value = 'Unable to load content. Please try again later.'
  } finally {
    loading.value = false
  }
}

onMounted(initialize)
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>