<template>
  <div class="mb-6 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg p-5">
    <div class="space-y-5">
      <!-- Top Row: Search and New Article -->
      <div class="flex flex-col lg:flex-row gap-4">
        <!-- Search Input -->
        <div class="flex-1">
          <label for="search" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Хайх</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              v-model="searchQuery"
              type="text"
              id="search"
              class="block w-full pl-10 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Мэдээний гарчиг..."
              @input="emitFilters"
            />
            <button 
              v-if="searchQuery" 
              @click="clearSearch"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
            >
              <XCircle class="h-5 w-5" />
            </button>
          </div>
        </div>

        <!-- New Article Button -->
        <div class="flex items-end">
          <NuxtLink
            to="/admin/news/create"
            class="w-full lg:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <Plus class="h-5 w-5 mr-1.5" />
            Шинэ мэдээ
          </NuxtLink>
        </div>
      </div>

      <!-- Bottom Row: Filters -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Category Filter -->
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Ангилал</label>
          <select
            v-model="selectedCategory"
            id="category"
            class="block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            @change="emitFilters"
          >
            <option value="">Бүгд</option>
            <option v-for="category in props.categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>

        <!-- Featured Filter -->
        <div>
          <label for="featured" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Онцлох</label>
          <select
            v-model="selectedFeatured"
            id="featured"
            class="block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            @change="emitFilters"
          >
            <option value="">Бүгд</option>
            <option value="true">Онцлох</option>
            <option value="false">Энгийн</option>
          </select>
        </div>

        <!-- Date Range Filter -->
        <div>
          <label for="dateRange" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Хугацаа</label>
          <select
            v-model="selectedDateRange"
            id="dateRange"
            class="block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            @change="emitFilters"
          >
            <option value="">Бүгд</option>
            <option value="today">Өнөөдөр</option>
            <option value="week">7 хоног</option>
            <option value="month">30 хоног</option>
          </select>
        </div>

        <!-- Clear Filters Button -->
        <div class="flex items-end">
          <button
            @click="clearFilters"
            class="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <svg class="h-5 w-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Цэвэрлэх
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { XCircle, Plus } from 'lucide-vue-next'

interface Props {
  categories: Array<{
    id: string
    name: string
    slug: string
  }>
  filters: {
    search: string
    category: string
    featured: boolean | null
    dateRange: string
  }
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:filters', filters: {
    search: string
    category: string
    featured: boolean | null
    dateRange: string
  }): void
}>()

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedFeatured = ref('')
const selectedDateRange = ref('')

// Initialize values from props
if (props.filters) {
  searchQuery.value = props.filters.search || ''
  selectedCategory.value = props.filters.category || ''
  selectedFeatured.value = props.filters.featured === null ? '' : String(props.filters.featured)
  selectedDateRange.value = props.filters.dateRange || ''
}

watch(() => props.filters, (newFilters) => {
  if (newFilters) {
    searchQuery.value = newFilters.search || ''
    selectedCategory.value = newFilters.category || ''
    selectedFeatured.value = newFilters.featured === null ? '' : String(newFilters.featured)
    selectedDateRange.value = newFilters.dateRange || ''
  }
}, { deep: true, immediate: true })

const clearSearch = () => {
  searchQuery.value = ''
  emitFilters()
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedFeatured.value = ''
  selectedDateRange.value = ''
  emitFilters()
}

const emitFilters = () => {
  console.log('Emitting filters:', {
    search: searchQuery.value.trim(),
    category: selectedCategory.value,
    featured: null,
    dateRange: selectedDateRange.value
  })
  
  emit('update:filters', {
    search: searchQuery.value.trim(),
    category: selectedCategory.value,
    featured: null,
    dateRange: selectedDateRange.value
  })
}
</script>