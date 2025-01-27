<template>
  <section class="news-grid" aria-label="News articles">
    <div class="container-custom">
      <div v-if="error" class="text-red-500 text-center mb-4" role="alert">
        {{ error }}
      </div>

      <div v-if="newsStore.isLoading && displayedArticles.length === 0" class="grid gap-4 md:grid-cols-2">
        <SkeletonLoader v-for="i in 6" :key="`initial-skeleton-${i}`" />
      </div>

      <TransitionGroup 
        name="fade" 
        tag="div" 
        class="grid gap-6 grid-cols-1 md:grid-cols-2"
        v-else
      >
        <article
          v-for="article in displayedArticles"
          :key="article.id"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden group hover:scale-[1.02] transition-all duration-200"
        >
          <div class="relative">
            <NuxtLink :to="`/news/${article.id}`">
              <img 
                :src="article.image || '/placeholder-image.svg'" 
                :alt="article.title"
                class="w-full h-64 object-cover"
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
      </TransitionGroup>

      <div v-if="newsStore.hasMoreArticles" class="text-center mt-8">
        <button
          @click="loadMore"
          class="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
          :disabled="newsStore.isLoading"
        >
          {{ newsStore.isLoading ? 'Loading...' : 'Load More' }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Heart, MessageCircle, Share2, Clock } from 'lucide-vue-next';
import { useNewsStore } from '~/stores/news';
import type { Article } from '~/stores/news';

const newsStore = useNewsStore();
const props = defineProps<{
  displayedArticles: Article[];
  error?: string;
}>();

const loadMore = () => {
  newsStore.loadMoreArticles();
};

const toggleLike = (article: Article) => {
  newsStore.toggleLike(article);
};

const shareArticle = (article: Article) => {
  if (navigator.share) {
    navigator.share({
      title: article.title,
      text: article.excerpt || '',
      url: window.location.origin + '/news/' + article.id
    }).catch((error) => console.log('Error sharing:', error));
  } else {
    const url = window.location.origin + '/news/' + article.id;
    navigator.clipboard.writeText(url)
      .then(() => alert('Link copied to clipboard!'))
      .catch((error) => console.log('Error copying to clipboard:', error));
  }
};

const formatDate = (dateString: string): string => {
  return newsStore.getTimeAgo(dateString);
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.fade-move {
  transition: transform 0.3s ease;
}
</style>
