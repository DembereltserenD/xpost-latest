<template>
  <div v-if="news.length > 0" class="space-y-6">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Featured News -->
      <div class="lg:col-span-2">
        <div class="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/5 dark:to-orange-900/5 p-5 rounded-lg border border-yellow-100 dark:border-yellow-900/10">
          <div class="flex items-center gap-2 mb-4">
            <svg class="h-6 w-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <div class="flex items-center gap-2">
              <h3 class="font-medium text-gray-900 dark:text-white">Том онцлох мэдээ</h3>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                {{ featuredCount }}/4
              </span>
            </div>
          </div>
          
          <div v-if="mainFeaturedNews" class="space-y-4">
            <div class="space-y-3">
              <h4 class="text-lg font-medium text-gray-900 dark:text-white line-clamp-2">{{ mainFeaturedNews.title }}</h4>
              <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{{ mainFeaturedNews.excerpt || mainFeaturedNews.title }}</p>
              <div class="flex items-center justify-between">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getCategoryClass(mainFeaturedNews.category?.name || 'Ангилалгүй')">
                  {{ mainFeaturedNews.category?.name || 'Ангилалгүй' }}
                </span>
                <button
                  @click="removeFeatured(mainFeaturedNews)"
                  class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg text-red-700 bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 transition-colors duration-200"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Онцлохоос хасах
                </button>
              </div>
            </div>
          </div>
          <div v-else class="flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400">
            <svg class="w-12 h-12 mb-2 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <p>Том онцлох мэдээ сонгоогүй байна</p>
          </div>
        </div>
      </div>

      <!-- Small Featured News -->
      <div class="lg:col-span-1">
        <div class="space-y-4">
          <template v-for="position in 3" :key="position">
            <div class="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/5 dark:to-orange-900/5 p-4 rounded-lg border border-yellow-100 dark:border-yellow-900/10">
              <div v-if="getSmallFeaturedNews(position)" class="space-y-3">
                <h4 class="font-medium text-gray-900 dark:text-white line-clamp-2">{{ getSmallFeaturedNews(position)?.title }}</h4>
                <div class="flex items-center justify-between">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getCategoryClass(getSmallFeaturedNews(position)?.category?.name || 'Ангилалгүй')">
                    {{ getSmallFeaturedNews(position)?.category?.name || 'Ангилалгүй' }}
                  </span>
                  <button
                    @click="removeFeatured(getSmallFeaturedNews(position)!)"
                    class="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              <div v-else class="flex flex-col items-center justify-center py-4 text-gray-400 dark:text-gray-500">
                <svg class="w-8 h-8 mb-1 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <p class="text-sm">Жижиг онцлох #{{ position }}</p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface NewsArticle {
  id: string
  title: string
  excerpt?: string
  content: string
  category_id?: string
  category?: {
    id: string
    name: string
    slug: string
  }
  is_featured: boolean
  featured_position?: number
  created_at: string
  updated_at: string
}

interface Props {
  news: NewsArticle[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'removeFeatured', news: NewsArticle): void
}>()

const featuredCount = computed(() => props.news.filter(n => n.is_featured).length)

const mainFeaturedNews = computed(() => 
  props.news.find(n => n.is_featured && n.featured_position === 0)
)

const getSmallFeaturedNews = (position: number) => 
  props.news.find(n => n.is_featured && n.featured_position === position)

const removeFeatured = (news: NewsArticle) => {
  emit('removeFeatured', news)
}

const getCategoryClass = (category: string) => {
  const classes = {
    'Улс төр': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400',
    'Нийгэм': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400',
    'Эдийн засаг': 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400',
    'Спорт': 'bg-rose-100 text-rose-800 dark:bg-rose-900/20 dark:text-rose-400',
    'Технологи': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-400',
    'Боловсрол': 'bg-violet-100 text-violet-800 dark:bg-violet-900/20 dark:text-violet-400',
    'Байгаль орчин': 'bg-lime-100 text-lime-800 dark:bg-lime-900/20 dark:text-lime-400',
    'Соёл урлаг': 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/20 dark:text-fuchsia-400',
    'Эрүүл мэнд': 'bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-400',
    'Ангилалгүй': 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
  }
  return classes[category] || classes['Ангилалгүй']
}
</script>