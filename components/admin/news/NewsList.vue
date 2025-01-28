<template>
  <div class="space-y-4">
    <!-- Table Container -->
    <div class="bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg overflow-hidden">
      <!-- Table Header with Bulk Actions -->
      <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <input
              type="checkbox"
              :checked="isAllSelected"
              :indeterminate="isIndeterminate"
              @change="toggleAll"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
            >
            <div v-if="selectedItems.length > 0" class="flex items-center gap-2">
              <span class="text-sm text-gray-700 dark:text-gray-300">
                {{ selectedItems.length }} сонгосон
              </span>
              <button
                @click="$emit('bulk-delete')"
                class="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg text-red-700 bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 transition-colors duration-200"
                :disabled="isDeleting"
              >
                <Trash2 class="w-4 h-4 mr-1.5" />
                Устгах
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop View -->
      <div class="hidden lg:block">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" class="w-12 px-4 py-3">
                  <!-- Checkbox column -->
                </th>
                <th 
                  v-for="header in headers" 
                  :key="header.value"
                  scope="col" 
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-white transition-colors duration-200"
                  @click="$emit('update:sort', header.value)"
                >
                  <div class="flex items-center gap-1">
                    {{ header.text }}
                    <svg v-if="sortField === header.value" class="w-4 h-4" :class="{ 'rotate-180': sortDirection === 'desc' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                    </svg>
                  </div>
                </th>
                <th scope="col" class="relative px-4 py-3 w-48">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr 
                v-for="item in sortedNews" 
                :key="item.id" 
                class="group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                :class="{ 'bg-yellow-50/80 dark:bg-yellow-400/5': item.is_featured }"
              >
                <td class="px-4 py-3 whitespace-nowrap">
                  <input
                    type="checkbox"
                    :value="item.id"
                    :checked="selectedItems.includes(item.id)"
                    @change="toggleSelection(item.id)"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                  >
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="h-10 w-10 flex-shrink-0">
                      <div class="h-10 w-10 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900 dark:text-white">
                        {{ item.title }}
                      </div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">
                        {{ item.excerpt }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <span :class="getCategoryClasses(item.category?.name || 'Ангилалгүй')">
                    {{ item.category?.name || 'Ангилалгүй' }}
                  </span>
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDateTime(item.created_at) }}
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-right">
                  <div class="flex items-center justify-end space-x-2">
                    <button 
                      v-if="!item.is_featured"
                      @click="setFeaturedPosition(item, getNextSmallPosition())"
                      class="text-gray-400 hover:text-yellow-500 transition-colors duration-200"
                    >
                      <Star class="w-5 h-5" />
                    </button>
                    <button 
                      v-else
                      @click="removeFeatured(item)"
                      class="text-yellow-500 hover:text-yellow-600 transition-colors duration-200"
                    >
                      <StarOff class="w-5 h-5" />
                    </button>
                    <button 
                      @click="$emit('edit-news', item.id)"
                      class="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                    >
                      <Edit class="w-5 h-5" />
                    </button>
                    <button 
                      @click="deleteNews(item.id)"
                      class="text-gray-400 hover:text-red-500 transition-colors duration-200"
                    >
                      <Trash2 class="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Mobile View -->
      <div class="lg:hidden">
        <div class="divide-y divide-gray-200 dark:divide-gray-700">
          <div v-for="item in sortedNews" :key="item.id" class="p-4">
            <div class="flex items-start gap-4">
              <!-- Checkbox and Image -->
              <div class="flex items-center gap-3">
                <input
                  type="checkbox"
                  :value="item.id"
                  :checked="selectedItems.includes(item.id)"
                  @change="toggleSelection(item.id)"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                >
                <div class="h-12 w-12 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
              </div>

              <!-- Content -->
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <h3 class="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">{{ item.title }}</h3>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{{ item.excerpt }}</p>
                  </div>
                  <div class="flex-shrink-0">
                    <button
                      @click="toggleMenu(item)"
                      class="p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <MoreVertical class="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div class="mt-2 flex flex-wrap items-center gap-2">
                  <span :class="getCategoryClasses(item.category?.name || 'Ангилалгүй')">{{ item.category?.name || 'Ангилалгүй' }}</span>
                  <span class="text-xs text-gray-500 dark:text-gray-400">
                    {{ formatDateTime(item.created_at) }}
                  </span>
                </div>

                <!-- Mobile Actions -->
                <div v-if="activeMenu === item.id" class="mt-3 flex flex-wrap gap-2">
                  <button
                    v-if="!item.is_featured"
                    @click="setFeaturedPosition(item, getNextSmallPosition())"
                    class="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg text-yellow-700 bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:hover:bg-yellow-900/40 transition-colors duration-200"
                  >
                    <Star class="w-4 h-4 mr-1" />
                    Жижиг онцлох
                  </button>
                  <button
                    v-if="item.is_featured"
                    @click="removeFeatured(item)"
                    class="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    <StarOff class="w-4 h-4 mr-1" />
                    Хасах
                  </button>
                  <button
                    @click="$emit('edit-news', item.id)"
                    class="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg text-blue-700 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40 transition-colors duration-200"
                  >
                    <Edit class="w-4 h-4 mr-1" />
                    Засах
                  </button>
                  <button
                    @click="deleteNews(item.id)"
                    class="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg text-red-700 bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 transition-colors duration-200"
                  >
                    <Trash2 class="w-4 h-4 mr-1" />
                    Устгах
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="news.length === 0" class="py-12">
        <div class="text-center">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">Мэдээ олдсонгүй</h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Хайлтын үр дүн хоосон байна.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Star, StarOff, MoreVertical, Trash2, Edit } from 'lucide-vue-next'

interface NewsArticle {
  id: string
  title: string
  excerpt?: string
  content: string
  featured_image?: string
  category_id: string
  category?: {
    id: string
    name: string
    slug: string
  }
  is_featured: boolean
  featured_position?: number
  created_at: string
  updated_at: string
  status: 'published' | 'draft' | 'archived'
  views: number
  shares: number
  likes: number
  author_id?: string
  user_id?: string
}

interface Props {
  news: NewsArticle[]
  loading?: boolean
  sortField?: string
  sortDirection?: 'asc' | 'desc'
  selectedItems: string[]
  filters: {
    search?: string
    category?: string
    featured?: boolean | null
    dateRange?: 'today' | 'week' | 'month'
  }
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:selectedItems': [items: string[]]
  'update:sort': [field: string]
  'bulk-delete': []
  'setFeatured': [news: NewsArticle, position: number]
  'removeFeatured': [news: NewsArticle]
  'delete': [id: string]
  'edit-news': [id: string]
}>()

const sortedNews = computed(() => {
  return props.news
})

const headers = [
  { text: 'Мэдээ', value: 'title' },
  { text: 'Ангилал', value: 'category_id' },
  { text: 'Үүсгэсэн', value: 'created_at' }
]

const isAllSelected = computed(() => {
  return props.news.length > 0 && props.selectedItems.length === props.news.length
})

const isIndeterminate = computed(() => {
  return props.selectedItems.length > 0 && props.selectedItems.length < props.news.length
})

const activeMenu = ref<string | null>(null)

const toggleSelection = (id: string) => {
  const newSelectedItems = props.selectedItems.includes(id)
    ? props.selectedItems.filter(item => item !== id)
    : [...props.selectedItems, id]
  emit('update:selectedItems', newSelectedItems)
}

const toggleAll = (event: Event) => {
  const target = event.target as HTMLInputElement
  const newSelectedItems = target.checked ? props.news.map(item => item.id) : []
  emit('update:selectedItems', newSelectedItems)
}

const toggleMenu = (news: NewsArticle) => {
  activeMenu.value = activeMenu.value === news.id ? null : news.id
}

const setFeaturedPosition = (news: NewsArticle, position: number) => {
  emit('setFeatured', news, position)
}

const removeFeatured = (news: NewsArticle) => {
  emit('removeFeatured', news)
}

const deleteNews = (id: string) => {
  emit('delete', id)
}

const getNextSmallPosition = () => {
  const smallPositions = props.news
    .filter(n => n.is_featured && n.featured_position !== 0)
    .map(n => n.featured_position || 0)
  return Math.max(1, ...smallPositions) + 1
}

const formatDateTime = (date: string) => {
  return new Date(date).toLocaleString('mn-MN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const categoryColors = {
  'Улс төр': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400',
  'Нийгэм': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400',
  'Эдийн засаг': 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400',
  'Спорт': 'bg-rose-100 text-rose-800 dark:bg-rose-900/20 dark:text-rose-400',
  'Технологи': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-400',
  'Боловсрол': 'bg-violet-100 text-violet-800 dark:bg-violet-900/20 dark:text-violet-400',
  'Байгаль орчин': 'bg-lime-100 text-lime-800 dark:bg-lime-900/20 dark:text-lime-400',
  'Соёл урлаг': 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/20 dark:text-fuchsia-400',
  'Эрүүл мэнд': 'bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-400',
  'default': 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
}

const getCategoryClasses = (category: string) => {
  const baseClasses = 'font-medium px-3 py-1 rounded-full text-sm'
  const colorClasses = categoryColors[category] || categoryColors.default
  return `${baseClasses} ${colorClasses}`
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

/* Custom scrollbar */
.overflow-x-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.overflow-x-auto::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}

.dark .overflow-x-auto::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.3);
}

/* Hover effects */
.hover-scale {
  transition: transform 0.2s ease;
}

.hover-scale:hover {
  transform: scale(1.02);
}

/* Loading skeleton animation */
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.skeleton {
  background: linear-gradient(90deg, 
    rgba(156, 163, 175, 0.1) 25%, 
    rgba(156, 163, 175, 0.2) 37%, 
    rgba(156, 163, 175, 0.1) 63%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.dark .skeleton {
  background: linear-gradient(90deg, 
    rgba(31, 41, 55, 0.4) 25%, 
    rgba(31, 41, 55, 0.6) 37%, 
    rgba(31, 41, 55, 0.4) 63%
  );
}
</style>