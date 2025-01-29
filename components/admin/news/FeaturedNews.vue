<template>
  <div class="space-y-4 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Featured News Title -->
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
        Нийт онцлох мэдээ
        <span class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">{{ featuredCount }}/4</span>
      </h2>
    </div>

    <!-- Featured News Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Main Featured News -->
      <div class="lg:col-span-2">
        <div v-if="mainFeaturedNews" 
             class="relative bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700">
          <div class="p-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div class="flex items-start sm:items-center flex-col sm:flex-row gap-2">
                <span class="px-2 py-0.5 text-xs font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 rounded-full">
                  Том онцлох
                </span>
                <h3 class="text-base font-semibold text-gray-900 dark:text-white line-clamp-2">{{ mainFeaturedNews.title }}</h3>
              </div>
              <div class="flex items-center gap-3 self-end sm:self-auto">
                <div class="relative">
                  <button 
                    @click="activeDropdown = activeDropdown === 'main' ? null : 'main'"
                    class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors duration-200"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    Байрлал өөрчлөх
                  </button>
                  <div 
                    v-show="activeDropdown === 'main'"
                    class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 dark:divide-gray-700 focus:outline-none z-10"
                  >
                    <div class="py-1">
                      <button
                        v-for="position in [1, 2, 3]"
                        :key="position"
                        @click="swapPositions(mainFeaturedNews, position)"
                        class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Жижиг онцлох {{ position }}
                      </button>
                    </div>
                    <div class="py-1">
                      <button
                        @click="removeFeatured(mainFeaturedNews)"
                        class="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Онцлохоос хасах
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  @click="removeFeatured(mainFeaturedNews)"
                  class="inline-flex items-center px-2 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                  title="Онцлох мэдээнээс хасах"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="h-24 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
          <span class="text-sm">Том онцлох мэдээ сонгогдоогүй байна</span>
        </div>
      </div>

      <!-- Small Featured News -->
      <div class="lg:col-span-1">
        <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
          <template v-for="position in [1, 2, 3]" :key="position">
            <div class="col-span-1">
              <div v-if="getSmallFeaturedNews(position)" 
                   class="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700">
                <div class="p-3">
                  <div class="flex flex-col gap-2">
                    <div class="flex items-start justify-between gap-2">
                      <div class="flex flex-col gap-1">
                        <span class="px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded-full inline-flex items-center w-fit">
                          Жижиг онцлох {{ position }}
                        </span>
                        <h4 class="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                          {{ getSmallFeaturedNews(position)!.title }}
                        </h4>
                      </div>
                    </div>
                    <div class="flex items-center justify-end gap-2">
                      <div class="relative">
                        <button 
                          @click="activeDropdown = activeDropdown === 'small' + position ? null : 'small' + position"
                          class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors duration-200"
                        >
                          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                          </svg>
                          Байрлал өөрчлөх
                        </button>
                        <div 
                          v-show="activeDropdown === 'small' + position"
                          class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 dark:divide-gray-700 focus:outline-none z-10"
                        >
                          <div class="py-1">
                            <button
                              @click="swapPositions(getSmallFeaturedNews(position), 0)"
                              class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              Том онцлох
                            </button>
                            <button
                              v-for="pos in [1, 2, 3].filter(p => p !== position)"
                              :key="pos"
                              @click="swapPositions(getSmallFeaturedNews(position), pos)"
                              class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              Жижиг онцлох {{ pos }}
                            </button>
                          </div>
                          <div class="py-1">
                            <button
                              @click="removeFeatured(getSmallFeaturedNews(position))"
                              class="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              Онцлохоос хасах
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        @click="removeFeatured(getSmallFeaturedNews(position))"
                        class="inline-flex items-center px-2 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                        title="Онцлох мэдээнээс хасах"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="h-20 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                <span class="text-sm">Жижиг онцлох {{ position }} сонгогдоогүй</span>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NewsArticle } from '~/types'
import { ref, computed } from 'vue'

const props = defineProps<{
  news: NewsArticle[]
}>()

const emit = defineEmits<{
  (e: 'removeFeatured', news: NewsArticle): void
  (e: 'set-featured-position', news: NewsArticle, position: number): void
}>()

const activeDropdown = ref<string | null>(null)

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (activeDropdown.value) {
    const target = event.target as HTMLElement
    if (!target.closest('.relative')) {
      activeDropdown.value = null
    }
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const featuredCount = computed(() => props.news.filter(n => n.is_featured).length)

const mainFeaturedNews = computed(() => {
  return props.news.find(n => n.is_featured && n.featured_position === 0)
})

const getSmallFeaturedNews = (position: number) => {
  return props.news.find(n => n.is_featured && n.featured_position === position)
}

const swapPositions = (news: NewsArticle, newPosition: number) => {
  emit('set-featured-position', news, newPosition)
  activeDropdown.value = null
}

const removeFeatured = (news: NewsArticle) => {
  emit('removeFeatured', news)
}
</script>