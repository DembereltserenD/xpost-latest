<template>
<div class="admin-news-container">
  <div>
    <div class="max-w-full mx-auto">
      <!-- Error Alert -->
      <TransitionGroup name="fade">
        <div v-if="error" class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
          <strong class="font-bold">Алдаа!</strong>
          <span class="block sm:inline">{{ error }}</span>
          <button @click="error = null" class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
            </svg>
          </button>
        </div>
      </TransitionGroup>

      <!-- Success Alert -->
      <TransitionGroup name="fade">
        <div v-if="successMessage" class="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative" role="alert">
          <span class="block sm:inline">{{ successMessage }}</span>
          <button @click="successMessage = null" class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg class="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
            </svg>
          </button>
        </div>
      </TransitionGroup>

      <!-- Bulk Delete Confirmation Modal -->
      <TransitionRoot appear :show="isDeleteModalOpen" as="template">
        <Dialog as="div" @close="closeDeleteModal" class="relative z-10">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black/25 dark:bg-black/40" />
          </TransitionChild>

          <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
              >
                <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                    Сонгосон мэдээнүүдийг устгах
                  </DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      {{ selectedItems.length }} мэдээг устгахдаа итгэлтэй байна уу? Энэ үйлдлийг буцаах боломжгүй.
                    </p>
                  </div>

                  <div class="mt-4 flex justify-end space-x-3">
                    <button
                      type="button"
                      class="inline-flex justify-center rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      @click="closeDeleteModal"
                    >
                      Болих
                    </button>
                    <button
                      type="button"
                      class="inline-flex justify-center rounded-lg border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      :disabled="isDeleting"
                      @click="confirmBulkDelete"
                    >
                      <svg v-if="isDeleting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {{ isDeleting ? 'Устгаж байна...' : 'Устгах' }}
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>

      <!-- Loading State -->
      <div v-if="loading" class="space-y-4">
        <div class="animate-pulse flex items-center justify-between">
          <div>
            <div class="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div class="mt-2 h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div class="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div class="animate-pulse space-y-4">
          <div class="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div class="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
      </div>

      <div v-else>
        <!-- Header -->
        <div class="mb-6">
          <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">Мэдээний жагсаалт</h1>
        </div>

        <!-- Stats -->
        <NewsStats 
          :total-count="newsItems.length"
          :draft-count="draftCount"
          :today-count="todayCount"
        />

        <!-- News Filters -->
        <NewsFilters
          :filters="filters"
          :categories="categories"
          @update:filters="updateFilters"
        />

        <!-- Featured News -->
        <div class="mb-8">
          <FeaturedNews
            :news="featuredNews"
            @remove-featured="removeFeatured"
            @set-featured-position="setFeaturedPosition"
          />
        </div>

        <!-- News List -->
        <NewsList
          :news="filteredNews"
          :filters="filters"
          :sort-field="sortField"
          :sort-direction="sortDirection"
          v-model:selected-items="selectedItems"
          @update:sort="toggleSort"
          @delete-news="deleteNews"
          @bulk-delete="openDeleteModal"
          @set-featured-position="setFeaturedPosition"
          @remove-featured="removeFeatured"
        />
      </div>
    </div>
  </div>
   </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})

import { ref, onMounted, computed } from 'vue'
import { useSupabaseClient } from '#imports'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import NewsStats from '~/components/admin/news/NewsStats.vue'
import NewsFilters from '~/components/admin/news/NewsFilters.vue'
import NewsList from '~/components/admin/news/NewsList.vue'
import FeaturedNews from '~/components/admin/news/FeaturedNews.vue'

// Initialize Supabase client
const supabase = useSupabaseClient()

// State
const newsItems = ref<NewsArticle[]>([])
const selectedItems = ref<string[]>([])
const sortField = ref('created_at')
const sortDirection = ref<'asc' | 'desc'>('desc')
const isDeleting = ref(false)
const isDeleteModalOpen = ref(false)
const loading = ref(false)
const error = ref<string | null>(null)
const successMessage = ref<string | null>(null)
const categories = ref<Array<{ id: string; name: string; slug: string }>>([])
const filters = ref({
  search: '',
  category: '',
  featured: null as boolean | null,
  dateRange: ''
})

// Computed properties for stats
const draftCount = computed(() => 
  newsItems.value.filter(n => !n.is_published).length
)

const todayCount = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return newsItems.value.filter(n => {
    const newsDate = new Date(n.created_at)
    return newsDate >= today
  }).length
})

// Computed properties for news items
const filteredNews = computed(() => {
  // First, get featured and non-featured news separately
  const featured = newsItems.value.filter(item => item.is_featured)
    .sort((a, b) => (a.featured_position || 0) - (b.featured_position || 0))
  const nonFeatured = newsItems.value.filter(item => !item.is_featured)

  // Combine them with featured at top
  return [...featured, ...nonFeatured]
})

const featuredNews = computed(() => {
  return newsItems.value
    .filter(item => item.is_featured)
    .sort((a, b) => (a.featured_position || 0) - (b.featured_position || 0))
})

// Fetch categories with error handling
const fetchCategories = async () => {
  try {
    const { data, error: fetchError } = await supabase
      .from('categories')
      .select('id, name, slug')
      .order('name')

    if (fetchError) throw fetchError
    
    categories.value = data || []
  } catch (err) {
    handleError(err, 'Ангилалын жагсаалтыг татах үед алдаа гарлаа')
  }
}

// Update filters method with proper typing
const updateFilters = (newFilters: typeof filters.value) => {
  console.log('Updating filters:', newFilters)
  filters.value = {
    ...filters.value,
    ...newFilters
  }
  fetchNews()
}

const toggleSort = (field: string) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'desc'
  }
}

// Error handling helper
const handleError = (err: any, customMessage: string) => {
  console.error(customMessage, err)
  error.value = `${customMessage}. Дахин оролдоно уу.`
  setTimeout(() => {
    error.value = null
  }, 5000)
}

// Success message helper
const showSuccess = (message: string) => {
  successMessage.value = message
  setTimeout(() => {
    successMessage.value = null
  }, 3000)
}

// Fetch news with error handling
const fetchNews = async () => {
  try {
    loading.value = true
    error.value = null
    
    // Single query that handles both featured and non-featured news
    let query = supabase
      .from('news')
      .select(`
        *,
        category:categories(
          id,
          name,
          slug
        )
      `)
      
    // Apply filters
    if (filters.value.category) {
      query = query.eq('category_id', filters.value.category)
    }

    // Apply featured filter if specified
    if (filters.value.featured !== null) {
      query = query.eq('is_featured', filters.value.featured)
    }

    // Apply date range filter
    if (filters.value.dateRange) {
      const now = new Date()
      let startDate = new Date()
      
      switch (filters.value.dateRange) {
        case 'today':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
          break
        case 'week':
          startDate = new Date(now)
          startDate.setDate(startDate.getDate() - 7)
          break
        case 'month':
          startDate = new Date(now)
          startDate.setMonth(startDate.getMonth() - 1)
          break
      }
      
      // Convert to UTC for database query
      const utcStartDate = new Date(startDate.toLocaleString('en-US', { timeZone: 'UTC' }))
      query = query.gte('created_at', utcStartDate.toISOString())
    }

    // Apply search filter
    if (filters.value.search) {
      query = query.ilike('title', `%${filters.value.search}%`)
    }
    
    // Apply sorting with featured news always at top
    if (sortField.value && sortField.value !== 'featured_position') {
      query = query.order('is_featured', { ascending: false })
            .order('featured_position', { ascending: true, nullsLast: true })
            .order(sortField.value, { ascending: sortDirection.value === 'asc' })
    } else {
      // Default sorting: featured first, then by created_at
      query = query.order('is_featured', { ascending: false })
            .order('featured_position', { ascending: true, nullsLast: true })
            .order('created_at', { ascending: false })
    }

    const { data: newsData, error: newsError } = await query

    if (newsError) throw newsError
    
    newsItems.value = newsData || []
    console.log('Fetched news:', newsItems.value)
  } catch (err) {
    handleError(err, 'Мэдээний жагсаалтыг татах үед алдаа гарлаа')
  } finally {
    loading.value = false
  }
}

// Featured news management with error handling
const setFeaturedPosition = async (news: NewsArticle, newPosition: number) => {
  try {
    if (!news.is_published) {
      handleError(null, 'Ноорог мэдээг онцлох боломжгүй. Эхлээд нийтлэх шаардлагатай.')
      return
    }

    const { error: updateError } = await supabase
      .from('news')
      .update({
        is_featured: true,
        featured_position: newPosition
      })
      .eq('id', news.id)

    if (updateError) throw updateError

    await fetchNews()
    showSuccess('Онцлох мэдээний байрлал амжилттай өөрчлөгдлөө')
  } catch (err) {
    handleError(err, 'Онцлох мэдээний байрлал өөрчлөх үед алдаа гарлаа')
  }
}

const removeFeatured = async (news: NewsArticle) => {
  try {
    const { error: updateError } = await supabase
      .from('news')
      .update({ 
        is_featured: false,
        featured_position: null
      })
      .eq('id', news.id)

    if (updateError) throw updateError

    await fetchNews()
    showSuccess('Онцлох мэдээнээс амжилттай хасагдлаа')
  } catch (err) {
    handleError(err, 'Онцлох мэдээнээс хасах үед алдаа гарлаа')
  }
}

// Delete functions
const deleteNews = async (id: string) => {
  try {
    const { error: deleteError } = await supabase
      .from('news')
      .delete()
      .eq('id', id)

    if (deleteError) throw deleteError

    await fetchNews()
    showSuccess('Мэдээ амжилттай устгагдлаа')
  } catch (err) {
    handleError(err, 'Мэдээ устгах үед алдаа гарлаа')
  }
}

const openDeleteModal = () => {
  if (selectedItems.value.length === 0) {
    error.value = 'Устгах мэдээг сонгоно уу'
    return
  }
  isDeleteModalOpen.value = true
}

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false
}

const confirmBulkDelete = async () => {
  try {
    isDeleting.value = true
    const { error: deleteError } = await supabase
      .from('news')
      .delete()
      .in('id', selectedItems.value)

    if (deleteError) throw deleteError

    await fetchNews()
    selectedItems.value = []
    closeDeleteModal()
    showSuccess(`${selectedItems.value.length} мэдээ амжилттай устгагдлаа`)
  } catch (err) {
    handleError(err, 'Олон мэдээ устгах үед алдаа гарлаа')
  } finally {
    isDeleting.value = false
  }
}

// Function to check and generate missing short IDs
async function checkMissingShortIds() {
  try {
    const { data: newsWithoutShortIds, error: fetchError } = await supabase
      .from('news')
      .select('id')
      .is('short_id', null)

    if (fetchError) throw fetchError

    if (newsWithoutShortIds && newsWithoutShortIds.length > 0) {
      for (const news of newsWithoutShortIds) {
        const shortId = Math.random().toString(36).substring(2, 8)
        const { error: updateError } = await supabase
          .from('news')
          .update({ short_id: shortId })
          .eq('id', news.id)

        if (updateError) throw updateError
      }
      console.log(`Generated short IDs for ${newsWithoutShortIds.length} news articles`)
    }
  } catch (err) {
    handleError(err, 'Богино ID шалгах/үүсгэх үед алдаа гарлаа')
  }
}

onMounted(async () => {
  console.log('Component mounted, fetching initial data...')
  await fetchCategories()
  await checkMissingShortIds()
  fetchNews()
})
</script>

<style>
.admin-news-container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>