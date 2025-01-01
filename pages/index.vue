<template>
  <div class="py-8">
    <!-- Featured News Section - Full Width -->
    <section class="mb-12">
      <FeaturedNews 
        :articles="featuredArticles" 
        v-if="!isLoading && featuredArticles.length > 0"
      />
    </section>
    
    <!-- Latest News with Sidebar -->
    <section class="container mx-auto px-4">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Latest News -->
        <div class="flex-1">
          <div class="flex items-center space-x-2 mb-4">
            <Clock class="h-5 w-5" />
            <h2 class="scroll-m-20 text-2xl font-semibold tracking-tight">
              Сүүлийн үеийн мэдээ
            </h2>
          </div>
          
          <div class="grid gap-4 -mt-2">
            <article v-for="article in articles" :key="article.id" 
              class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group hover:scale-[1.02] transition-all duration-200">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <!-- Image column - always takes same space -->
                <div class="relative h-[160px] md:h-[180px] bg-gray-100 dark:bg-gray-700">
                  <NuxtLink v-if="article.image" :to="`/news/${article.slug}`" class="block h-full">
                    <img 
                      :src="article.image" 
                      :alt="article.title"
                      class="w-full h-full object-cover"
                    />
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-200">
                      <span class="text-white font-medium">Цааш унших</span>
                    </div>
                  </NuxtLink>
                  <div v-else class="w-full h-full flex items-center justify-center">
                    <Image class="w-12 h-12 text-gray-400" />
                  </div>
                </div>
                <!-- Content column -->
                <div class="p-4 md:col-span-2">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="bg-red-500 text-white text-xs px-2 py-1 rounded">{{ article.category }}</span>
                    <time class="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                      <Clock class="w-4 h-4 mr-1" />
                      {{ getTimeAgo(article.created_at) }}
                    </time>
                  </div>
                  <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white line-clamp-2">
                    <NuxtLink :to="`/news/${article.slug}`" class="hover:text-red-500 transition-colors duration-200">
                      {{ article.title }}
                    </NuxtLink>
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{{ article.excerpt }}</p>
                  
                  <!-- Social Interactions -->
                  <div class="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <button 
                      @click.prevent="toggleLike(article)"
                      class="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-all duration-200"
                    >
                      <Heart :class="{ 'fill-red-500 stroke-red-500': article.liked }" class="w-5 h-5" />
                      <span class="text-sm">{{ article.likes || 0 }}</span>
                    </button>
                    <button class="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-200">
                      <MessageCircle class="w-5 h-5" />
                      <span class="text-sm">{{ article.comments || 0 }}</span>
                    </button>
                    <button @click.prevent="shareArticle(article)" class="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-all duration-200">
                      <Share2 class="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <div v-if="hasMoreArticles" class="mt-8 text-center">
            <button 
              @click="loadMore" 
              :disabled="isLoading"
              class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {{ isLoading ? 'Loading...' : 'Load More' }}
            </button>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:w-[380px] mt-4 lg:mt-[35px]">
          <Sidebar />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useNewsStore } from '~/stores/news'
import { Clock, Heart, MessageCircle, Share2, Image } from 'lucide-vue-next'
import type { Article } from '~/stores/news'
import Sidebar from '~/components/Sidebar.vue'

const newsStore = useNewsStore()
const { articles, featuredArticles, isLoading, error, hasMoreArticles } = storeToRefs(newsStore)
const currentPage = ref(1)

const fetchArticles = async () => {
  try {
    await newsStore.fetchArticles(currentPage.value)
    error.value = null
  } catch (err) {
    console.error('Error fetching articles:', err)
    error.value = 'Failed to fetch articles'
  }
}

const loadMore = async () => {
  if (!hasMoreArticles.value || isLoading.value) return
  currentPage.value++
  await fetchArticles()
}

const getTimeAgo = (date: string) => {
  const now = new Date()
  const past = new Date(date)
  const diffTime = Math.abs(now.getTime() - past.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 1) return 'Өчигдөр'
  if (diffDays < 7) return `${diffDays} өдрийн өмнө`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} долоо хоногийн өмнө`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} сарын өмнө`
  return `${Math.floor(diffDays / 365)} жилийн өмнө`
}

const toggleLike = (article: Article) => {
  newsStore.toggleLike(article);
};

const shareArticle = (article: Article) => {
  if (navigator.share) {
    navigator.share({
      title: article.title,
      text: article.excerpt || '',
      url: window.location.origin + '/news/' + article.slug
    }).catch((error) => console.log('Error sharing:', error));
  } else {
    const url = window.location.origin + '/news/' + article.slug;
    navigator.clipboard.writeText(url)
      .then(() => alert('Link copied to clipboard!'))
      .catch((error) => console.log('Error copying to clipboard:', error));
  }
};

onMounted(() => {
  fetchArticles()
})
</script>