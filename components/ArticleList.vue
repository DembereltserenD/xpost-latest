<template>
  <div class="article-list">
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-grid">
      <div v-for="i in 6" :key="i" class="article-skeleton">
        <div class="skeleton-image"></div>
        <div class="skeleton-content">
          <div class="skeleton-title"></div>
          <div class="skeleton-description"></div>
          <div class="skeleton-meta"></div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-message">
      <p>{{ error }}</p>
      <button @click="$emit('retry')" class="retry-button">
        Try Again
      </button>
    </div>

    <!-- Articles Grid -->
    <div class="grid gap-6 grid-cols-1 md:grid-cols-2">
      <article 
        v-for="article in articles" 
        :key="article.id" 
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden group hover:scale-[1.02] transition-all duration-200"
      >
        <div class="relative">
          <NuxtLink :to="`/news/${article.id}`">
            <img 
              :src="article.featured_image || '/placeholder-image.svg'" 
              :alt="article.title"
              class="w-full h-64 object-cover"
              loading="lazy"
              @error="handleImageError"
            />
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-200">
              <span class="text-white font-medium">Цааш унших</span>
            </div>
          </NuxtLink>
        </div>

        <div class="p-6">
          <div class="flex items-center gap-2 mb-4">
            <span class="bg-red-500 text-white text-xs px-2 py-1 rounded">{{ article.category }}</span>
            <time class="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <Clock class="w-4 h-4 mr-1" />
              {{ formatDate(article.created_at) }}
            </time>
          </div>

          <h2 class="font-bold text-xl text-gray-900 dark:text-white mb-3">
            <NuxtLink :to="`/news/${article.id}`" class="hover:text-red-500 transition-colors duration-200">
              {{ article.title }}
            </NuxtLink>
          </h2>

          <p class="text-gray-600 dark:text-gray-300 text-base mb-4 line-clamp-2">
            {{ article.excerpt }}
          </p>

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
      </article>
    </div>

    <!-- Load More Button -->
    <div v-if="hasMoreArticles" class="text-center mt-8">
      <button
        @click="$emit('load-more')"
        :disabled="isLoading"
        class="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        <span v-if="!isLoading">Цааш үзэх</span>
        <span v-else>Уншиж байна...</span>
      </button>
    </div>

    <!-- End Message -->
    <p v-if="!isLoading && !error && !hasMoreArticles" class="text-center text-gray-500 dark:text-gray-400 mt-8">
      Бүх мэдээг харууллаа
    </p>
  </div>
</template>

<script setup lang="ts">
import { Heart, MessageCircle, Share2, Clock } from 'lucide-vue-next'
import { useNewsStore } from '~/stores/news'
import type { Article } from '~/stores/news'

const props = defineProps<{
  articles: Article[]
  isLoading?: boolean
  error?: string | null
  hasMoreArticles?: boolean
}>()

const newsStore = useNewsStore()
const defaultImage = 'https://images.unsplash.com/photo-1623066798929-946425dbe1b0'

const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  if (img.src !== defaultImage) {
    img.src = defaultImage
  }
}

const toggleLike = (article: Article) => {
  newsStore.toggleLike(article)
}

const shareArticle = async (article: Article) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.origin + '/news/' + article.id
      })
    } catch (err) {
      console.error('Error sharing:', err)
    }
  } else {
    // Fallback for browsers that don't support Web Share API
    const url = window.location.origin + '/news/' + article.id
    navigator.clipboard.writeText(url)
    // You might want to show a toast notification here
  }
}

const formatDate = (dateString: string): string => {
  return newsStore.getTimeAgo(dateString)
}

defineEmits<{
  (e: 'load-more'): void
  (e: 'retry'): void
}>()
</script>

<style scoped>
/* ... */
</style>